import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppInsightsService } from './services/app-insights.service';
import { BlobStorageCoreService } from './services/blob-storage-core.service';
import { UrlService } from './services/url.service';
import { SupaBaseCoreService } from './services/supabase-core.service';

@Module({
    providers: [
        UrlService,
        AppInsightsService,
        BlobStorageCoreService,
        SupaBaseCoreService
    ],
    exports: [
        UrlService,
        AppInsightsService,
        BlobStorageCoreService,
        SupaBaseCoreService,
        HttpModule
    ],
    imports: [ HttpModule ],
})
export class CommonModule {}
