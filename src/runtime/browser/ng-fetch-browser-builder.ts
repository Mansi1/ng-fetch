import { Config } from '../../interface/config';
import { NgFetch } from '../../interface/ng-fetch';
import { NgFetchRequestOption } from '../../interface/ng-fetch-request';
import { NgFetchResponse, RejectAblePromise } from '../../interface/ng-fetch-response';
import { getHeaderMap } from './function/get-header-map';
import { bodyToBuffer as normalBodyToBuffer } from '../../function/body-to-buffer';
import { intercept } from '../../function/intercept';
import { HEADER_CONTENT_TYPE } from '../../headers';

export const bodyToBuffer = (config: Config, contentType: string, body: any): unknown => {
  const bodyToSend = normalBodyToBuffer(config, contentType, body);
  if (bodyToSend instanceof Buffer) {
    return bodyToSend.buffer.slice(bodyToSend.byteOffset, bodyToSend.byteOffset + bodyToSend.byteLength);
  }
  return body;
};

export const ngFetchBrowserBuilder = (config: Config): NgFetch => (
  requestUrl: string,
  options: NgFetchRequestOption = { method: 'GET' },
): RejectAblePromise<NgFetchResponse> => {
  const { url, method, headers } = intercept(config, requestUrl, options);

  let requestReject: any;
  const request = new Promise<NgFetchResponse>((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    if (options && options.eventListeners && options.eventListeners.start) {
      options.eventListeners.start({
        target: xhr,
        type: 'browser',
      });
    }

    // 2.0 Configure it: GET-request for the URL
    xhr.open(method, url);

    // set timeout in ms
    xhr.timeout = config.timeoutInMs;

    // 2.1 Set header
    // eslint-disable-next-line no-restricted-syntax
    for (const [headerName, headerValue] of Object.entries(headers)) {
      xhr.setRequestHeader(headerName, headerValue);
    }

    requestReject = () => {
      if (xhr.readyState !== 4) xhr.abort();
    };

    xhr.addEventListener('abort', () =>
      reject({
        status: -1,
        message: 'You have canceled the request yourself',
        headers: {},
      }),
    );
    xhr.addEventListener('timeout', () =>
      reject({
        status: -2,
        message: 'Request timeout',
        headers: {},
      }),
    );

    xhr.addEventListener('load', () => {
      const responseHeaders = getHeaderMap(xhr.getAllResponseHeaders());
      if (xhr.status >= 200 && xhr.status < 400) {
        resolve({
          status: xhr.status,
          response: Buffer.from(xhr.response),
          headers: responseHeaders,
        });
      } else {
        reject({
          status: xhr.status,
          message: `Error: ${
            xhr.responseType === 'text' || xhr.responseType === '' ? xhr.responseText : 'No error message'
          }`,
          headers: responseHeaders,
        });
      }
    });

    xhr.addEventListener('error', () =>
      reject({
        status: -4,
        message: `Unknown error: ${
          xhr.responseType === 'text' || xhr.responseType === '' ? xhr.responseText : 'No error message'
        }`,
        headers: {},
      }),
    );

    if (options?.eventListeners?.uploadProgress) {
      xhr.upload.addEventListener('progress', options?.eventListeners?.uploadProgress);
    }

    if (options?.eventListeners?.downLoadProgress) {
      xhr.addEventListener('progress', options?.eventListeners?.downLoadProgress);
    }

    xhr.send(bodyToBuffer(config, headers[HEADER_CONTENT_TYPE], options.body));
  });

  (request as any).reject = requestReject;
  return request as any;
};
