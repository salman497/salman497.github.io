import { Injectable, NestMiddleware } from '@nestjs/common';
import * as appInsights from 'applicationinsights';
import { NextFunction, Request, Response } from 'express';

import { AppInsightProps, RequestHeader } from './../../utils/constants';
@Injectable()
export class AppInsightsMiddleware implements NestMiddleware {
    public async use(request: Request, _res: Response, next: NextFunction) {
        const correlationContext = appInsights.getCorrelationContext();
        if (correlationContext) {
            correlationContext[AppInsightProps.CorrelationId] = request.headers[RequestHeader.CorrelationId];
            correlationContext[AppInsightProps.RequestUrl] = request.originalUrl;
            const requestSize = request?.socket?.bytesRead;
            correlationContext[AppInsightProps.RequestSize] = requestSize ? requestSize.toString() : 'unknown';
        }

        next();
    }
}
