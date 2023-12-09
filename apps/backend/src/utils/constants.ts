export const ResponseHeader = {
    PoweredBy: 'X-Powered-By',
    ContentSecurityPolicy: 'Content-Security-Policy',
    ContentTypeOptions: 'X-Content-Type-Options',
    FrameOptions: 'X-Frame-Options',
};

export const RequestHeader = {
    CorrelationId: 'correlation-id',
    GPTAuthKey: 'gpt-key'
};

export const AppInsightProps = {
    CorrelationId: 'correlation-id',
    RequestUrl: 'request-url',
    RequestSize: 'request-size',
};

export const ErrorTitle = {
    AzureBlobUploadFailure: 'Azure blob upload failure',
    AzureBlobHeadersFailure: 'Azure blob headers failure',
    AzureBlobDownloadFailure: 'Azure blob download failure',
    AzureBlobInitializeFailure: 'Blob initialize failure',
    AzureBlobInitContainer_Failure: 'Blob container initialize failure',
    AzureBlobExistsFailure: 'Blob exists failure',
    AzureBlobDeleteFailure: 'Blob delete failure',
    AzureBlobGetPropertiesFailure: 'Blob get properties failure',
    GPTTokenValidation: 'GPT Token Validation'
};



export const AppInsightEvent = {
    GTPAuthFailure: 'GTP Auth Failure'
};
