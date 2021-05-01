import { HttpMethod } from './http-method';
import { HeaderParameter } from './header-parameter';

export interface InterceptResponse {
  url: string;
  method: HttpMethod | string;
  headers?: HeaderParameter;
}
