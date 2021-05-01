import { Buffer } from 'buffer';
import { ResponseHeader } from './response-header';

export interface NgFetchResponse {
  status: number;
  response: Buffer;
  headers: ResponseHeader;
}

export type RejectAblePromise<T> = Promise<T> & {
  reject: () => void;
};
