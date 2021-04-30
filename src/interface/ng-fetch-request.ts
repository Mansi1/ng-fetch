// https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods

import {QueryParameter} from "./query-parameter";
import {HeaderParameter} from "./header-parameter";
import {HttpMethod} from "./http-method";
import {UrlParameter} from "./url-parameter";
import {Interceptor} from "./interceptor";

export interface NgFetchRequestOption<BodyType = any> {
    method: HttpMethod | string;
    queryParameter?: Array<QueryParameter>;
    headers?: HeaderParameter;
    body?: BodyType;
    urlParameter?: UrlParameter;
    interceptor?: Interceptor;
    eventListeners?: {
        start?: (evt: StartEvent) => void;
        uploadProgress?: (evt: ProgressEvent) => void;
        downLoadProgress?: (evt: ProgressEvent) => void;
    }
}

export interface ProgressEvent {
    readonly lengthComputable: boolean;
    readonly loaded: number;
    readonly total: number;
}

export interface StartEvent {
    readonly target: any;
    readonly type: 'node' | 'browser';
}