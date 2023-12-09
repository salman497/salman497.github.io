import { HttpException, HttpStatus } from '@nestjs/common';

export interface ApiError {
    type: string;
    title: string;
    instance?: string;
    detail?: string;
    status: number;
    response?: any;
    correlation?: string;
}

export enum ErrorType {
    InternalError = 1,
    AzureBlob = 2,
    OpenAI = 3
}

function getCustomError(title: string, type: ErrorType, detail: string, err: any, statusCode?: number): ApiError {
    const status = statusCode || err?.status || err?.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
    if (err?.response) {
        return {
            title,
            detail,
            status,
            type: `Code${type}`,
        };
    }

    return {
        title,
        detail,
        status,
        type: `Code${type}`,
    };
}

export function isErrorType(responseType: string, type: ErrorType): boolean {
    return responseType === `Code${type}`;
}

function getErrorDetails(err?: any): string {
    if (!err) {
        return '';
    }

    // custom
    if (typeof err === 'string') {
        return err;
    }

    // axios
    if (err.response) {
        return err?.code || err.response?.data || err?.data;
    }

    return err.message || err.toString();
}

/**
 * NestJs HttpException
 *
 * @param title
 * @param type
 * @param error string or http error
 * @param status override to any status
 * @returns
 */
export const httpException = (title: string, type: ErrorType, error?: any, status?: number): HttpException => {
    if (error instanceof HttpException) {
        return error;
    }
    const errorDetails = getErrorDetails(error);
    const customError = getCustomError(title, type, errorDetails, error, status);
    return new HttpException(customError, customError.status);
};

export function getQuerySting(params: URLSearchParams): string {
    return params.toString() ? `?${params.toString()}` : '';
}

// For mobile delta api only, which won't encode the query string
export const toQueryString = (values: { [name: string]: string }): string => {
    return Object.keys(values)
        .map(name => `${name}=${values[name]}`)
        .join('&');
};
