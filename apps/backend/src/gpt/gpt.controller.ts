import { Controller, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { Formidable } from 'formidable';
import { BlobServiceClient } from '@azure/storage-blob';
 

@Controller('gpt')
export class GPTController {
  constructor() {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  saveOperation(@Req() req: Request, @Res() res: Response) {
    const form = new Formidable();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).send({ message: 'Error parsing the files' });
      }

      const presentationContent = fields.presentationContent as string;
      const images = files.files as File[];

      // Save presentationContent to Supabase
      const savedDataResponse = await this.saveDataToSupabase(presentationContent);
      if (!savedDataResponse.success) {
        return res.status(500).send({ message: 'Error saving data to Supabase' });
      }

      // Save images to Azure Blob Storage
      const blobSaveResults = await Promise.all(images.map(image => this.saveImageToAzureBlob(image)));
      if (blobSaveResults.some(result => !result.success)) {
        return res.status(500).send({ message: 'Error saving images to Azure Blob' });
      }

      return res.status(201).send({ id: savedDataResponse.id });
    });
  }

  private async saveDataToSupabase(presentationContent: string): Promise<{ success: boolean; id?: string; }> {
    try {
      // Replace with actual Supabase API call
      // Example: await this.httpService.post('https://your-supabase-url.com', { presentationContent }).toPromise();
      return { success: true, id: 'generated-id' }; // Mock response
    } catch (error) {
      return { success: false };
    }
  }

  private async saveImageToAzureBlob(file: File): Promise<{ success: boolean; }> {
    try {
      const blobServiceClient = BlobServiceClient.fromConnectionString('your-azure-blob-connection-string');
      const containerClient = blobServiceClient.getContainerClient('your-container-name');
      const blockBlobClient = containerClient.getBlockBlobClient(file.name);
      await blockBlobClient.uploadFile((file as any).path);
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  }
}
