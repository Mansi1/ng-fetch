import { NgFetchResponse, RejectAblePromise } from './ng-fetch-response';
import { NgFetchRequestOption } from './ng-fetch-request';

export type NgFetch = (url: string, options?: NgFetchRequestOption) => RejectAblePromise<NgFetchResponse>;
