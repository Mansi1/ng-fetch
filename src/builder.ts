import { Config } from './interface/config';
import { buildQueryParameters } from './function/build-query-parameter';
import { BodyAdapterJson } from './adapter/body/body-adapter-json';
import { RUNTIME } from './runtime';
import { NgFetch } from './interface/ng-fetch';
import { ngFetchBrowserBuilder } from './runtime/browser/ng-fetch-browser-builder';
import { BodyAdapterPlainText } from './adapter/body/body-adapter-plain-text';
import { buildUrl } from './function/build-url';
import { ngFetchNodeBuilder } from './runtime/node/ng-fetch-node-builder';
import { BodyAdapterMultipartFormData } from './adapter/body/body-adapter-multipart';

export const { browser, node } = RUNTIME;

export const DEFAULT_CONFIG: Config = {
  buildQueryParameters,
  timeoutInMs: 6_000,
  buildUrl,
  defaultContentType: 'application/json',
  bodySerializers: {
    default: BodyAdapterJson,
    'application/json': BodyAdapterJson,
    'plain/text': BodyAdapterPlainText,
    'multipart/form-data': BodyAdapterMultipartFormData,
  },
};

export const builder = (initConfig: Partial<Config> = DEFAULT_CONFIG): NgFetch => {
  const config = { ...DEFAULT_CONFIG, ...initConfig };

  if (typeof process !== 'undefined' && process.versions != null && process.versions.node != null) {
    return ngFetchNodeBuilder(config);
  }
  if (browser) {
    return ngFetchBrowserBuilder(config);
  }
  throw Error('ng-fetch need an node or browser runtime');
};
