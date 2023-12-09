import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import configuration from '../../config/configuration';
//import { getQuerySting, toQueryString } from '../../utils/http.util';

@Injectable()
export class UrlService {
    private readonly https: boolean = true;

    constructor(@Inject(configuration.KEY) private config: ConfigType<typeof configuration>) {}

    public get httpSchema(): string {
        return this.https ? 'https' : 'http';
    }

    public buildOpenAIChatUrl(host: string, model: string, modelVersion: string): string {
        return `${host}/openai/deployments/${model}/chat/completions?api-version=${modelVersion}`;
    }
}
