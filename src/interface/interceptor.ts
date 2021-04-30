import {HttpMethod} from "./http-method";
import {QueryParameter} from "./query-parameter";
import {HeaderParameter} from "./header-parameter";
import {UrlParameter} from "./url-parameter";

export interface InterceptorRequest {
    url: string;
    method: HttpMethod | string;
    headers?: HeaderParameter;
    queryParameter?: Array<QueryParameter>;
    urlParameter?: UrlParameter;
}

export type Interceptor = (request: InterceptorRequest) => InterceptorRequest