import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';
import { Injectable, Scope } from '@nestjs/common';
import { ErrorTitle } from './../../utils/constants';
import { ErrorType, httpException } from './../../utils/http.util';

@Injectable({ scope: Scope.TRANSIENT })
export class BlobStorageCoreService {
    private blobClient: BlobServiceClient;

    constructor() {
    }

    public async initializeContainer(containerName: string, connectionString: string): Promise<ContainerClient> {
        try {
            this.blobClient = BlobServiceClient.fromConnectionString(connectionString);
            const container = this.blobClient.getContainerClient(containerName);
            await container.createIfNotExists( { access: 'container' });
            return container;
        } catch (error) {
            throw httpException(ErrorTitle.AzureBlobInitializeFailure, ErrorType.AzureBlob, error);
        }
    }

    
}
