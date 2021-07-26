import {QueryParameter, ParameterType,BuildQueryParameter} from "../interface";

const buildQueryParam = (paramName: string, paramValue: ParameterType) =>
    `${encodeURIComponent(paramName)}=${encodeURIComponent(paramValue)}`;

/**
 * Build the query
 * @param parameters
 */
export const buildQueryParameters: BuildQueryParameter = (parameters: Array<QueryParameter> = []): string => {
    const keyValue: Array<string> = [];
    for (const parameter of parameters) {
        if (typeof parameter.value !== 'undefined') {
            if (Array.isArray(parameter.value)) {
                parameter.value.forEach((v) => keyValue.push(buildQueryParam(parameter.name, v)));
            } else {
                keyValue.push(buildQueryParam(parameter.name, parameter.value));
            }
        }
    }
    if (keyValue.length === 0) {
        return '';
    }
    return `?${keyValue.join('&')}`;
};
