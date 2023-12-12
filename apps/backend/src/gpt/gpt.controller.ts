import {
  Controller,
  Post,
  Body,
  UploadedFiles,
  UseInterceptors,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Observable, forkJoin, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ApiConsumes, ApiBody, ApiTags, ApiResponse, ApiOperation, ApiHeader  } from '@nestjs/swagger';
import { GPTService } from './services/gpt.service';
import 'multer';
import { ErrorType, httpException } from '../utils/http.util';
import { GPTAuthGuard } from '../common/guards/gpt.guard';

@ApiTags('GPT')
@UseGuards(GPTAuthGuard)
@Controller('gpt')
export class GPTController {
  constructor(private readonly gptService: GPTService) {}

  @Post('process')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'files', maxCount: 10 }]))
  @ApiConsumes('multipart/form-data')
  @ApiHeader({ name: 'gpt-key', required: true })
  @ApiBody({
    description: 'Upload DALL-E generated images and GPT generated markdown content with a presentation name.',
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
            description: 'DALL-E generated images',
          },
        },
        markdownContent: { type: 'string', description: 'GPT generated markdown content' },
        presentationName: { type: 'string', description: 'Presentation name' },
      },
    },
  })
  @ApiOperation({ summary: 'Process OpenAI GPT and DALL-E content' })
  @ApiResponse({ status: 201, description: 'Content processed successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Api key missing.' })
  process(
    @UploadedFiles() data: { files: Express.Multer.File[] },
    @Body('markdownContent') markdownContent: string,
    @Body('presentationName') presentationName: string,
  ): Observable<string> {
    if (!markdownContent) {
      throw httpException('Invalid payload', ErrorType.GPT, 'markdown is empty', HttpStatus.BAD_REQUEST);
    }
    const uploadObservables = data?.files?.map(file => this.gptService.uploadImage$(file.buffer, file.originalname)) || [of(null)];
    return forkJoin(uploadObservables).pipe(
      switchMap(() => {
        return this.gptService.saveContent$(markdownContent, presentationName);
      })
    );
  }
}
