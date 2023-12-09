import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiError } from '../../utils/http.util';
import { AppInsightsService } from '../services/app-insights.service';

@Catch(HttpException)
export class ApiExceptionFilter implements ExceptionFilter {
    constructor(private readonly appInsightsService: AppInsightsService) {}

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
        const correlationId = request.headers['correlation-id'] as string;
        const errorResponse = this.getError(exception, status, request.url, correlationId);

        this.appInsightsService.trackException(exception, { ...errorResponse });
        response.status(status).json(errorResponse);
    }

    private getError(exception: HttpException, status: number, instance: string, correlation: string): ApiError {
        const resp: any = exception.getResponse();

        if (resp instanceof Object && Object.prototype.hasOwnProperty.call(resp, 'type')) {
            return {
                ...resp,
                instance,
                correlation,
            } as ApiError;
        }

        // Check for class-validator error
        if (resp instanceof Object && resp?.message && Array.isArray(resp?.message)) {
            return {
                title: `Invalid request`,
                detail: `${resp?.message}`,
                instance,
                correlation,
                type: 'ValidationFailure',
                status,
            };
        }
        return {
            title: exception.message,
            instance,
            correlation,
            type: 'InternalError',
            status,
        };
    }
}
