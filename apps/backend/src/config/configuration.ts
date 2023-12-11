import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
    appInsightsKey: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING,
    blob: {
        connectionString: process.env.BLOB_CONNECTION_STRING || 'DefaultEndpointsProtocol=https;AccountName=presentydata;AccountKey=fPKNcANIuzalVHTv5J9i6XHwm0UZg2PozY0YIenFO1hIq1btKUPO+Opt1HksoBv4wvhYamA0RaYL+ASt0l2Uqw==;EndpointSuffix=core.windows.net',
        containerName: 'images',
    },
    supaBase: {
        table: 'markdown',
        url: 'https://keopaarrwhppnzememsw.supabase.co',
        key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtlb3BhYXJyd2hwcG56ZW1lbXN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUwOTQ1MTMsImV4cCI6MjAxMDY3MDUxM30.2Nv4KkM6EqtLGtLEadPkvQsG5o7-fLs3q2_gKVkecdg'
    }
}));
