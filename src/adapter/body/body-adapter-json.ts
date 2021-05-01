import { BodySerializerAdapter } from '../../interface/body-serializer-adapter';

export const BodyAdapterJson: BodySerializerAdapter = (data: any, options) =>
  Buffer.from(JSON.stringify(data), options?.charset || 'utf-8');
