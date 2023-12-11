import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
    appInsightsKey: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING,
    blob: {
        connectionString: process.env.BLOB_CONNECTION_STRING || 'DefaultEndpointsProtocol=https;AccountName=presenty;AccountKey=Xz141S3XzqOO3ukdmxDdmIwFPK7Ft4M/uolqS91Y+VfXKEsMGv89drW1vG1rJ4TzSWV8Gw14Nju7+AStzE1cxQ==;EndpointSuffix=core.windows.net',
    },
    supaBase: {
        table: 'markdown',
        url: 'https://keopaarrwhppnzememsw.supabase.co',
        key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtlb3BhYXJyd2hwcG56ZW1lbXN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUwOTQ1MTMsImV4cCI6MjAxMDY3MDUxM30.2Nv4KkM6EqtLGtLEadPkvQsG5o7-fLs3q2_gKVkecdg'
    }
}));
