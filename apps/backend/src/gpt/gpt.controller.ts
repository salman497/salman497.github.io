import { Controller, Post, Body, HttpStatus, UseGuards, Get } from '@nestjs/common';
import { Observable, forkJoin, of, switchMap } from 'rxjs';
import {
  ApiBody,
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiHeader,
} from '@nestjs/swagger';
import { GPTService } from './services/gpt.service';
import { ErrorType, httpException } from '../utils/http.util';
import { GPTAuthGuard } from '../common/guards/gpt.guard';
import { GPTResponse } from './model/gpt.model';
import { GPTPrivacyPolicy } from './utils/gpt.privacy';

@ApiTags('GPT')
@Controller('gpt')
export class GPTController {
  constructor(private readonly gptService: GPTService) {}

  @UseGuards(GPTAuthGuard)
  @Post('save')
  @ApiHeader({ name: 'gpt-key', required: true })
  @ApiBody({
    description:
      'Save GPT generated markdown content with optional presentation ID and Dall.E generated images.',
    schema: {
      type: 'object',
      properties: {
        markdownContent: {
          type: 'string',
          description: 'GPT generated markdown content',
        },
        presentationName: { type: 'string', description: 'Presentation name' },
        presentationId: {
          type: 'number',
          description:
            'Optional presentation ID. Required only when updating existing content.',
        },
        dalleImages: {
          type: 'array',
          description: `Array of Dall.E generated images. Each image is processed using below mentioned steps and then used as value in dalleImages
          Step 1: The image is converted to a JPEG format with a resolution of 720px.
          Step 2: The JPEG image is then converted into a base64 encoded string.
          Step 3: This base64 string is split into a sequence of chunks, with each chunk containing 200 or less characters, placing its value in base64Chunks`,
          items: {
            type: 'object',
            properties: {
              fileNameWithExtension: {
                type: 'string',
                description: 'GUID Filename of Dall.E generated image, including .jpeg extension.',
                example: '550e8400-e29b-41d4-a716-446655440000.jpeg',
              },
              base64Chunks: {
                type: 'array',
                description:
                  'Array of chunked base64 encoded strings, where each chunk is of 200 or less character, combining chunks give base64 image.',
                items: {
                  type: 'string',
                  example: '9j/4AAQSkZJRgABAQAAAQABAAD/7QCEUGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAGgcAigAYkZCTUQwYTAwMGE3MTAxMDAwMDQzMmEwMDAwMjU3MTAwMDBlODc3MDAwMDYxN2QwMDAwNmFiYzAwMDAzYzJjMDEwMDYyMzQwMTAwMGIzZTAxMDAzZjQ3MDEwMGQxMGYwMjAwAP/bAEMABgQFBgUEBgYFBgcHBggKEAoKCQkKFA4PDBAXFBgYFxQWFhodJR8aGyMcFhYgLCAjJicpKikZHy0wLSgwJSgpKP/bAEMBBwcHCggKEwoKEygaFhooKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKP/CABEIAtAD',
                },
              },
            },
          },
        },
      },
      required: ['markdownContent', 'presentationName'],
    },
  })
  @ApiOperation({ summary: 'Save OpenAI GPT content' })
  @ApiResponse({
    status: 201,
    description: 'Content saved successfully.',
    type: GPTResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  saveContent(
    @Body('markdownContent') markdownContent: string,
    @Body('presentationName') presentationName: string,
    @Body('presentationId') presentationId?: number,
    @Body('dalleImages')
    dalleImages?: { fileNameWithExtension: string; base64Chunks: string[] }[]
  ): Observable<GPTResponse> {
    if (!markdownContent) {
      throw httpException(
        'Invalid payload',
        ErrorType.GPT,
        'markdown is empty',
        HttpStatus.BAD_REQUEST
      );
    }

    const uploadObservables = dalleImages?.map((image) => {
      return this.gptService.uploadImage$(
        image.fileNameWithExtension,
        image.base64Chunks
      );
    }) || [of(null)];

    return forkJoin(uploadObservables).pipe(
      switchMap(() => {
        return this.gptService.saveContent$(
          markdownContent,
          presentationName,
          presentationId
        );
      })
    );
  }

  @Get('privacy')
  getPrivacyPolicy(): Observable<string> {
    return of(GPTPrivacyPolicy);
  }
}
