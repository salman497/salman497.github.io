import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as appInsights from 'applicationinsights';

import configuration from './../../config/configuration';
import { AppInsightProps } from './../../utils/constants';

@Injectable()
export class AppInsightsService {
    private started = false;
    private recordException = false;
    constructor(@Inject(configuration.KEY) private config: ConfigType<typeof configuration>) {
        this.startAppInsightsClient();
    }

    public trackEvent(name: string, properties?: { [key: string]: any }) {
        if (!this.started) {
            console.debug({ name, properties });
            return;
        }

        appInsights.defaultClient.trackEvent({ name, properties });
    }

    public trackTrace(
        message: string,
        properties?: { [key: string]: any },
        severity: appInsights.Contracts.SeverityLevel = appInsights.Contracts.SeverityLevel.Information,
    ) {
        if (!this.started) {
            console.debug({ message });
            return;
        }

        appInsights.defaultClient.trackTrace({ message, severity, properties });
    }

    public trackException(exception: Error, properties?: { [key: string]: any }) {
        if(!this.recordException) {
            return;
        }
        if (!this.started) {
            console.debug(`---> Exception occurred `, exception);
            return;
        }

        appInsights.defaultClient.trackException({ exception, properties });
    }

    public startAppInsightsClient() {
        const appInsightsKey = this.config.appInsightsKey;

        if (!appInsightsKey) {
            return;
        }

        const appInsightInstance = appInsights
            .setup(appInsightsKey)
            .setAutoDependencyCorrelation(true)
            .setDistributedTracingMode(appInsights.DistributedTracingModes.AI_AND_W3C)
            .setAutoCollectRequests(true)
            .setAutoCollectPerformance(true)
            .setAutoCollectExceptions(true)
            .setAutoCollectDependencies(true)
            .setAutoCollectConsole(true, true)
            .setUseDiskRetryCaching(true)
            .setSendLiveMetrics(true);

        appInsightInstance.start();
        appInsights.defaultClient.setAutoPopulateAzureProperties(true);
        appInsights.defaultClient.addTelemetryProcessor(e => {
            const correlationContext = appInsights.getCorrelationContext();
            if (correlationContext) {
                const data = e.data.baseData;
                data.properties[AppInsightProps.CorrelationId] = correlationContext[AppInsightProps.CorrelationId];
                data.properties[AppInsightProps.RequestUrl] = correlationContext[AppInsightProps.RequestUrl];
                data.properties[AppInsightProps.RequestSize] = correlationContext[AppInsightProps.RequestSize];
            }

            return true;
        });

        this.started = true;
    }
}
