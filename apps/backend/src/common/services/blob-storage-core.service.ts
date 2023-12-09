import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import configuration from '../../config/configuration';

import { ErrorTitle } from './../../utils/constants';
import { ErrorType, httpException } from './../../utils/http.util';

@Injectable()
export class BlobStorageCoreService {
    private blobClient: BlobServiceClient;

    constructor() {
    }

    public async initializeContainer(containerName: string, connectionString: string): Promise<ContainerClient> {
        try {
            this.connectStorageAccount(connectionString);
            const container = this.blobClient.getContainerClient(containerName);
            await container.createIfNotExists();
            return container;
        } catch (error) {
            throw httpException(ErrorTitle.AzureBlobInitializeFailure, ErrorType.AzureBlob, error);
        }
    }

    private connectStorageAccount(connectionString: string) {
        try {
            this.blobClient = BlobServiceClient.fromConnectionString(connectionString);
        } catch (error) {
            throw httpException(ErrorTitle.AzureBlobInitializeFailure, ErrorType.AzureBlob, error);
        }
    }
}
