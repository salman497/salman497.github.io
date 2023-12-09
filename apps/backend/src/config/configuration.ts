import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
    appInsightsKey: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING,
    blob: {
        connectionString: process.env.BLOB_CONNECTION_STRING,
        containerName: 'images',
    }
}));
