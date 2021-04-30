import {UrlParameter} from "../interface/url-parameter";
import {QueryParameter} from "../interface/query-parameter";
import {Config} from "../interface/config";

export const buildUrl = (config: Config, url: string, urlParameter: UrlParameter = {}, queryParameter: Array<QueryParameter> = []): string => {
    let buildUrl = url;
    for (const urlParamEntry of Object.entries(urlParameter)) {
        buildUrl = buildUrl.split(urlParamEntry[0]).join(encodeURIComponent(urlParamEntry[1]));
    }
    const urlPrefix = config.buildQueryParameters(queryParameter);
    return buildUrl + urlPrefix;
}