import { Config } from '../interface/config';
import { NgFetchRequestOption } from '../interface/ng-fetch-request';
import { InterceptResponse } from '../interface/intercept-response';
import { Interceptor } from '../interface/interceptor';
import { HEADER_CONTENT_TYPE } from '../headers';

export const DEFAULT_INTERCEPTOR: Interceptor = (request) => request;

export const intercept = (config: Config, requestUrl: string, options: NgFetchRequestOption): InterceptResponse => {
  const interceptor = options?.interceptor || config?.interceptor || DEFAULT_INTERCEPTOR;

  const { method, url, urlParameter, queryParameter, headers } = interceptor({
    method: options.method,
    url: requestUrl,
    headers: options.headers || {},
    urlParameter: options.urlParameter || {},
    queryParameter: options.queryParameter || [],
  });

  const buildUrl = config.buildUrl(url, config.buildQueryParameters, urlParameter, queryParameter);

  // ensure serializer name in lowercase like application/json
  config.bodySerializers = Object.entries(config.bodySerializers).reduce(
    (prev, [type, serializer]) => ({ ...prev, [type.toLowerCase()]: serializer }),
    { default: config.bodySerializers.default },
  );

  if (!headers[HEADER_CONTENT_TYPE]) {
    headers[HEADER_CONTENT_TYPE] = config.defaultContentType;
  }

  return {
    method,
    url: buildUrl,
    headers,
  };
};
