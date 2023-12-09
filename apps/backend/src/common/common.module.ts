import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppInsightsService } from './services/app-insights.service';
import { BlobStorageCoreService } from './services/blob-storage-core.service';
import { UrlService } from './services/url.service';

@Module({
    providers: [
        UrlService,
        AppInsightsService,
        BlobStorageCoreService
    ],
    exports: [
        UrlService,
        AppInsightsService,
        BlobStorageCoreService,
        HttpModule
    ],
    imports: [ HttpModule ],
})
export class CommonModule {}
