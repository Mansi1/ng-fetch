import {BuildQueryParameter} from "./build-query-parameter";
import {BodySerializerAdapters} from "./body-serializer-adapter";
import {BuildUrl} from "./build-url";
import {Interceptor} from "./interceptor";

export interface Config{
    interceptor?: Interceptor
    timeoutInMs: number;
    buildQueryParameters: BuildQueryParameter;
    bodySerializers: BodySerializerAdapters;
    defaultContentType: string;
    buildUrl: BuildUrl;
}