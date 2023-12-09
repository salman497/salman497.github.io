import { HttpStatus, Injectable, Scope } from '@nestjs/common';
import { from, Observable, of, switchMap, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {
    BlobDeleteIfExistsResponse,
    BlobDeleteOptions,
    BlobGetPropertiesResponse,
    BlobHTTPHeaders,
    BlobSetHTTPHeadersResponse,
    BlockBlobClient,
    BlockBlobUploadResponse,
    ContainerClient,
} from '@azure/storage-blob';

import { ErrorType, httpException } from '../../utils/http.util';

import { ErrorTitle } from './../../utils/constants';
import { BlobStorageCoreService } from './blob-storage-core.service';
import { BlobResult } from '../model/blob.model';


@Injectable({ scope: Scope.TRANSIENT })
export class BlobStorageContainerService {
    private container: ContainerClient;

    constructor(private blobCoreService: BlobStorageCoreService) {}

    public async initialize(containerName: string, connectionString?: string) {
        this.container = await this.blobCoreService.initializeContainer(containerName, connectionString);
    }

    public upload<T>(blobPath: string, data: T, etag = ''): Observable<BlockBlobUploadResponse> {
        const strData = typeof data === 'string' ? (data as string) : JSON.stringify(data);
        const blockBlobClient = this.getCurrentContainerBlobClient(blobPath);

        // Create the conditions object based on the provided ETag
        const conditions = etag ? { ifMatch: etag } : undefined;

        return from(
            blockBlobClient.upload(strData, Buffer.byteLength(strData), {
                conditions: conditions,
            }),
        ).pipe(
            catchError(err => {
                if (err.statusCode === 412) {
                    // Retry the upload if it's a Precondition Failed (412) error, pass error to the consumer
                    return throwError(err);
                } else {
                    throw httpException(ErrorTitle.AzureBlobUploadFailure, ErrorType.AzureBlob, err);
                }
            }),
            map(resp => {
                if (resp._response.status !== HttpStatus.OK && resp._response.status !== HttpStatus.CREATED) {
                    throw httpException(
                        ErrorTitle.AzureBlobUploadFailure,
                        ErrorType.AzureBlob,
                        `Blob Error Code: ${resp.errorCode}`,
                        resp._response.status,
                    );
                }
                return resp;
            }),
        );
    }

    public download<T>(blobPath: string): Observable<BlobResult<T>> {
        const blockBlobClient = this.getCurrentContainerBlobClient(blobPath);
        return from(blockBlobClient.download()).pipe(
            catchError(err => {
                throw httpException(ErrorTitle.AzureBlobDownloadFailure, ErrorType.AzureBlob, err);
            }),
            switchMap(resp => {
                if (resp._response.status !== HttpStatus.OK) {
                    throw httpException(
                        ErrorTitle.AzureBlobDownloadFailure,
                        ErrorType.AzureBlob,
                        `Blob Error Code: ${resp.errorCode}`,
                        resp._response.status,
                    );
                }
                const etag = resp.etag;
                return from(this.streamToJSON(resp.readableStreamBody)).pipe(map(data => ({ etag, data } as BlobResult<T>)));
            }),
        );
    }

    public exists(blobPath: string): Observable<boolean> {
        const blockBlobClient = this.getCurrentContainerBlobClient(blobPath);
        return from(blockBlobClient.exists()).pipe(
            catchError(err => {
                throw httpException(ErrorTitle.AzureBlobExistsFailure, ErrorType.AzureBlob, err);
            }),
        );
    }

    public getBlobProperties(blobPath: string): Observable<BlobGetPropertiesResponse> {
        const blockBlobClient = this.getCurrentContainerBlobClient(blobPath);
        return from(blockBlobClient.getProperties()).pipe(
            tap(response => {
                return response;
            }),
            catchError(err => {
                if (err.statusCode !== 404) {
                    throw httpException(ErrorTitle.AzureBlobGetPropertiesFailure, ErrorType.AzureBlob, err);
                }
                return of(null);
            }),
        );
    }

    public delete(blobPath: string, options?: BlobDeleteOptions): Observable<BlobDeleteIfExistsResponse> {
        const blockBlobClient = this.getCurrentContainerBlobClient(blobPath);
        return from(blockBlobClient.deleteIfExists(options)).pipe(
            map(resp => {
                if (resp._response.status !== HttpStatus.ACCEPTED) {
                    throw httpException(
                        ErrorTitle.AzureBlobDeleteFailure,
                        ErrorType.AzureBlob,
                        `Blob Error Code: ${resp.errorCode}`,
                        resp._response.status,
                    );
                }
                return resp;
            }),
            catchError(err => {
                throw httpException(ErrorTitle.AzureBlobDeleteFailure, ErrorType.AzureBlob, err);
            }),
        );
    }

    public setBlobHTTPHeaders(blobPath: string, headers: BlobHTTPHeaders): Observable<BlobSetHTTPHeadersResponse> {
        const blockBlobClient = this.getCurrentContainerBlobClient(blobPath);
        return from(blockBlobClient.setHTTPHeaders(headers)).pipe(
            catchError(err => {
                throw httpException(ErrorTitle.AzureBlobHeadersFailure, ErrorType.AzureBlob, err);
            }),
            map(resp => {
                if (resp._response.status !== HttpStatus.OK) {
                    throw httpException(
                        ErrorTitle.AzureBlobHeadersFailure,
                        ErrorType.AzureBlob,
                        `Blob Error Code: ${resp.errorCode}`,
                        resp._response.status,
                    );
                }
                return resp;
            }),
        );
    }

    private getCurrentContainerBlobClient(blobPath: string): BlockBlobClient {
        if (!this.container) {
            throw httpException(ErrorTitle.AzureBlobInitContainer_Failure, ErrorType.AzureBlob);
        }
        try {
            return this.container.getBlockBlobClient(blobPath);
        } catch (err) {
            throw httpException(ErrorTitle.AzureBlobInitContainer_Failure, ErrorType.AzureBlob, err);
        }
    }

    private async streamToJSON(readable) {
        readable.setEncoding('utf8');
        let data = '';
        for await (const chunk of readable) {
            data += chunk;
        }
        try {
            return JSON.parse(data);
        } catch (err) {
            return data;
        }
    }
}
