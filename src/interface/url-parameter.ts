import { ParameterType } from './query-parameter';

export interface UrlParameter {
  [name: string]: ParameterType;
}
