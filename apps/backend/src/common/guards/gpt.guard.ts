import { CanActivate, ExecutionContext, Injectable, HttpStatus } from '@nestjs/common';
import { AppInsightsService } from '../services/app-insights.service';
import { ErrorType, httpException } from '../../utils/http.util';
import { AppInsightEvent, ErrorTitle, RequestHeader } from '../../utils/constants';

@Injectable()
export class GPTAuthGuard implements CanActivate {
    constructor(private appInsight: AppInsightsService) {}

    public canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const apiKey = request?.headers[RequestHeader.GPTAuthKey];
        if(apiKey === 'this-request-is-coming-from-gpt') {
            return true;
        }
        this.appInsight.trackEvent(AppInsightEvent.GTPAuthFailure, request?.headers);
        throw httpException(ErrorTitle.GPTTokenValidation, ErrorType.OpenAI, 'missing api key', HttpStatus.UNAUTHORIZED);
    }

}
