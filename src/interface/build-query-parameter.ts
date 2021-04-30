import {QueryParameter} from "./query-parameter";

export type BuildQueryParameter = (parameters: Array<QueryParameter> | undefined) => string;