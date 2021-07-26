import {UrlParameter,QueryParameter,Config} from "../interface";

export const buildUrl = (config: Config, url: string, urlParameter: UrlParameter = {}, queryParameter: Array<QueryParameter> = []): string => {
    let buildUrl = url;
    for (const urlParamEntry of Object.entries(urlParameter)) {
        buildUrl = buildUrl.split(urlParamEntry[0]).join(encodeURIComponent(urlParamEntry[1]));
    }
    const urlPrefix = config.buildQueryParameters(queryParameter);
    return buildUrl + urlPrefix;
}