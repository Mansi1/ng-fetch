import { UrlParameter } from '../interface/url-parameter';
import { QueryParameter } from '../interface/query-parameter';
import { BuildQueryParameter } from '../interface/build-query-parameter';

export const buildUrl = (
  url: string,
  buildQueryParameters: BuildQueryParameter,
  urlParameter: UrlParameter = {},
  queryParameter: Array<QueryParameter> = [],
): string => {
  let responseUrl = url;
  for (const urlParamEntry of Object.entries(urlParameter)) {
    responseUrl = responseUrl.split(urlParamEntry[0]).join(encodeURIComponent(urlParamEntry[1]));
  }
  const urlPrefix = buildQueryParameters(queryParameter);
  return responseUrl + urlPrefix;
};
