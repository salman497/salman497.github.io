import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { from, map, Observable, of, switchMap } from 'rxjs';
import configuration from '../../config/configuration';
import { BlobStorageCoreService } from '../../common/services/blob-storage-core.service';
import { ContainerClient } from '@azure/storage-blob';
import { SupaBaseCoreService } from '../../common/services/supabase-core.service';
import { MarkdownTable } from '../../common/model/supabase.model';
import { generateRandomId } from '../../utils/utils';
import { GPTResponse } from '../model/gpt.model';
import { extractBase64Data } from '../utils/gpt.utils';



@Injectable()
export class GPTService implements OnModuleInit {
    private container: ContainerClient;
    constructor(
        private blobCoreService: BlobStorageCoreService,
        private supaBaseService: SupaBaseCoreService,
        @Inject(configuration.KEY) private config: ConfigType<typeof configuration>,
    ) {}

    public async onModuleInit() {
        this.supaBaseService.initialize(this.config.supaBase.url,this.config.supaBase.key, this.config.supaBase.table);
        this.container = await this.blobCoreService.initializeContainer(
            'images',
            this.config.blob.connectionString,
        );
    }

    saveContent$(markdown: string, presentationName:string, presentationId: number): Observable<GPTResponse> {
        const name = presentationName || 'my presentation';
        const item: MarkdownTable = {
            name,
            url_name: name.replace(/\s+/g, '-').toLowerCase(),
            id: presentationId || generateRandomId(),
            editor:{
                content: markdown,
                themeSelected: 'Black',
                animationSelected: 'Slide',
                showPen: true,
                showDrawingArea: true,
                showSlides: true,
                toggleViewer: true,
                showAutoSlide: true,
              }
        }

        
       return this.supaBaseService.save<MarkdownTable>(item).pipe(map(item => {
            return { presentationUrl: `https://www.presenty.app/published/edit/${item.id}/${item.url_name}`,
                     presentationId: item.id };
        }))
    }

    uploadImage$(fileNameWithExtension: string, chunkedBase64Image: string[]): Observable<{imageUrl: string}> {
        const base64Image = chunkedBase64Image.join('');
        const onlyBase64Part = extractBase64Data(base64Image);
        const fileBuffer = Buffer.from(onlyBase64Part, 'base64');
        
        // Generating the file name with the correct extension
        const blockBlobClient = this.container.getBlockBlobClient(fileNameWithExtension);
      
        return from(blockBlobClient.upload(fileBuffer, fileBuffer.length)).pipe(
          map(() => { return { imageUrl: blockBlobClient.url };})
        );
      }
}
