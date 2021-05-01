import { Config } from './interface/config';
import { buildQueryParameters } from './function/build-query-parameter';
import { BodyAdapterJson } from './adapter/body/body-adapter-json';
import { RUNTIME } from './runtime';
import { NgFetch } from './interface/ng-fetch';
import { ngFetchBrowserBuilder } from './runtime/browser/ng-fetch-browser-builder';
import { BodyAdapterPlainText } from './adapter/body/body-adapter-plain-text';
import { buildUrl } from './function/build-url';
import { ngFetchNodeBuilder } from './runtime/node/ng-fetch-node-builder';

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
  },
};

export const ngFetchBuilder = (initConfig: Partial<Config> = DEFAULT_CONFIG): NgFetch => {
  const config = { ...DEFAULT_CONFIG, ...initConfig };

  if (node) {
    return ngFetchNodeBuilder(config);
  }
  if (browser) {
    return ngFetchBrowserBuilder(config);
  }
  throw Error('ng-fetch need an node or browser runtime');
};
