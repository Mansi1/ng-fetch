import { UrlParameter } from './url-parameter';
import { QueryParameter } from './query-parameter';
import { BuildQueryParameter } from './build-query-parameter';

export type BuildUrl = (
  url: string,
  buildQueryParameters: BuildQueryParameter,
  urlParameter?: UrlParameter,
  queryParameter?: Array<QueryParameter>,
) => string;
