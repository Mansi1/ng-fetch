import {Config} from "./config";
import {UrlParameter} from "./url-parameter";
import {QueryParameter} from "./query-parameter";

export type BuildUrl = (config: Config, url: string, urlParameter?: UrlParameter, queryParameter?: Array<QueryParameter>) => string