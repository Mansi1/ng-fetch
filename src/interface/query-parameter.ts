export type ParameterType = string | boolean | number;
export interface QueryParameter {
  name: string;
  value: Array<ParameterType> | ParameterType;
}
