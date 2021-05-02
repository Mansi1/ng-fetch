/* eslint-disable consistent-return */
import { RequestOptions } from 'http';
import { ClientRequest } from 'node:http';
import { Config } from '../../interface/config';
import { NgFetch } from '../../interface/ng-fetch';
import { NgFetchRequestOption, ProgressEvent } from '../../interface/ng-fetch-request';
import { NgFetchResponse, RejectAblePromise } from '../../interface/ng-fetch-response';
import { getRequestAdapter } from './function/get-request-adapter';
import { bodyToBuffer } from '../../function/body-to-buffer';
import { intercept } from '../../function/intercept';
import { HEADER_CONTENT_LENGTH, HEADER_CONTENT_TYPE } from '../../headers';
import { Readable } from 'stream';

export const writeBodyToAdapter = async (
  config: Config,
  requestAdapter: ClientRequest,
  options: NgFetchRequestOption,
  contentType: string,
  body: any,
): Promise<void> => {
  const bodyToSend = bodyToBuffer(config, contentType, body);

  let uploadProgress: (evt) => void = () => {};

  if (options && options.eventListeners && options.eventListeners.uploadProgress) {
    uploadProgress = options.eventListeners.uploadProgress;
  }

  if (bodyToSend) {
    if (bodyToSend.constructor && bodyToSend.constructor.name === 'FormData') {
      const { stream, getComputedLength, headers } = bodyToSend as {
        stream: Readable;
        getComputedLength(): Promise<number>;
        headers: {
          'Content-Type': string;
        };
      };
      const totalLength = await getComputedLength();
      requestAdapter.setHeader(HEADER_CONTENT_TYPE, headers['Content-Type']);
      requestAdapter.setHeader(HEADER_CONTENT_LENGTH, totalLength);

      return new Promise<void>((resolve, reject) => {
        let length = 0;
        uploadProgress({ lengthComputable: true, loaded: length, total: totalLength });
        stream.on('data', (chunk) => {
          length += Buffer.byteLength(chunk);
          uploadProgress({ lengthComputable: true, loaded: length, total: totalLength });
          requestAdapter.write(chunk, () =>
            uploadProgress({
              lengthComputable: true,
              loaded: length,
              total: totalLength,
            }),
          );
        });
        stream.on('end', () => {
          resolve();
        });
        stream.on('error', (e) => {
          reject(e);
        });
      });
    }
    const contentLength = Buffer.byteLength(bodyToSend as Buffer);
    requestAdapter.setHeader(HEADER_CONTENT_LENGTH, Buffer.byteLength(bodyToSend as Buffer).toString());
    requestAdapter.write(bodyToSend, () =>
      uploadProgress({
        lengthComputable: true,
        loaded: contentLength,
        total: contentLength,
      }),
    );
  }
};

export const ngFetchNodeBuilder = (config: Config): NgFetch => (
  requestUrl: string,
  options: NgFetchRequestOption = { method: 'GET' },
): RejectAblePromise<NgFetchResponse> => {
  const { url, method, headers } = intercept(config, requestUrl, options);

  let requestReject: any;
  const request = new Promise<NgFetchResponse>((resolve, reject) => {
    const adapter = getRequestAdapter(requestUrl);

    let downloadProgress: (evt: ProgressEvent) => void = () => {};
    if (options && options.eventListeners && options.eventListeners.downLoadProgress) {
      downloadProgress = options.eventListeners.downLoadProgress;
    }

    const requestOption: RequestOptions = { method, timeout: config.timeoutInMs, headers };
    const adapterRequest = adapter.request(url, requestOption, (res) => {
      const totalLength = parseInt(res.headers['content-length'] || '0', 10);
      downloadProgress({ lengthComputable: totalLength !== 0, total: totalLength, loaded: 0 });

      const chunks: Array<string> = [];
      let length = 0;
      res.on('data', (chunk) => {
        if (Buffer.isBuffer(chunk)) {
          chunks.push(chunk.toString());
        } else if (typeof chunk === 'string') {
          chunks.push(chunk);
        }
        length += Buffer.byteLength(chunk);
        downloadProgress({
          lengthComputable: totalLength !== 0,
          total: totalLength || length,
          loaded: length,
        });
      });

      res.on('end', () => {
        const response = Buffer.from(chunks.join(''));
        if (res.statusCode < 200 || res.statusCode >= 400) {
          reject({
            status: res.statusCode,
            message: 'Request failed',
            headers: res.headers,
            response,
          });
        }
        resolve({
          status: res.statusCode,
          headers: res.headers as any,
          response,
        });
      });
    });

    if (options && options.eventListeners && options.eventListeners.start) {
      options.eventListeners.start({
        target: adapterRequest,
        type: 'node',
      });
    }

    requestReject = () => {
      reject({
        status: -1,
        message: 'You have canceled the request yourself',
        headers: {},
      });
    };

    adapterRequest.on('timeout', () =>
      reject({
        status: -2,
        message: 'Request timeout',
        headers: {},
      }),
    );

    adapterRequest.on('error', (e) => {
      reject({
        status: -3,
        message: `Unknown error: ${e.message}` || 'No error message',
        headers: {},
      });
    });

    writeBodyToAdapter(config, adapterRequest, options, headers[HEADER_CONTENT_TYPE], options.body)
      .then(() => adapterRequest.end())
      .catch((e) =>
        reject({
          status: -4,
          message: `Error in form data stream: ${e.message}`,
          headers: {},
        }),
      );
  });

  (request as any).reject = requestReject;
  return request as any;
};
