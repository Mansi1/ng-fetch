import { Config } from '../interface/config';
import { BodySerializerAdapter } from '../interface/body-serializer-adapter';

export const bodyToBuffer = (config: Config, contentType: string, body: any): unknown => {
  if (typeof body !== 'undefined') {
    if (body instanceof FormData) {
      return body;
    }
    const cleanContentType = contentType.split(';').shift().toLowerCase().trim();
    const serializer: BodySerializerAdapter =
      config.bodySerializers[cleanContentType] || config.bodySerializers.default;
    return serializer(body);
  }
  // return undefined
  return undefined;
};
