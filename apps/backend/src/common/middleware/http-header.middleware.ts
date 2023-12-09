import { Injectable, NestMiddleware } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { NextFunction, Request, Response } from 'express';
import * as uuid from 'uuid';

import { RequestHeader, ResponseHeader } from '../../utils/constants';

@Injectable()
export class HttpHeaderMiddleware implements NestMiddleware {
    constructor(private httpService: HttpService) {}

    public async use(request: Request, response: Response, next: NextFunction) {
        response.removeHeader(ResponseHeader.PoweredBy);
        request.headers[RequestHeader.CorrelationId] = request.headers[RequestHeader.CorrelationId] || uuid.v4();
        this.httpService.axiosRef.defaults.headers.common = {
            [RequestHeader.CorrelationId]: request.headers[RequestHeader.CorrelationId].toString(),
        };
        response.set(ResponseHeader.ContentSecurityPolicy, "frame-ancestors 'none'");
        response.set(ResponseHeader.ContentTypeOptions, 'nosniff');
        response.set(ResponseHeader.FrameOptions, 'SAMEORIGIN');
        next();
    }
}
