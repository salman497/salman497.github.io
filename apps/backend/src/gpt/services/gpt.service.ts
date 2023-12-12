import { extname } from 'path';

import { HttpStatus, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { v4 as uuid } from 'uuid';
import configuration from '../../config/configuration';
import { BlobStorageCoreService } from '../../common/services/blob-storage-core.service';
import { ContainerClient } from '@azure/storage-blob';
import { SupaBaseCoreService } from '../../common/services/supabase-core.service';
import { MarkdownTable } from '../../common/model/supabase.model';
import { generateRandomId } from '../../utils/utils';
import { GPTResponse } from '../model/gpt.model';



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

    uploadImage$(fileBuffer: Buffer, fileName: string): Observable<string> {
        const blockBlobClient = this.container.getBlockBlobClient(fileName);
    
        return from(blockBlobClient.upload(fileBuffer, fileBuffer.length)).pipe(
          map(() => blockBlobClient.url)
        );
      }
}
