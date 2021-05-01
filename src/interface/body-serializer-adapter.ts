export interface BodySerializerOption {
  charset:
    | 'ascii'
    | 'utf8'
    | 'utf-8'
    | 'utf16le'
    | 'ucs2'
    | 'ucs-2'
    | 'base64'
    | 'base64url'
    | 'latin1'
    | 'binary'
    | 'hex';
}

export type BodySerializerAdapter = (data: any, options?: BodySerializerOption) => Buffer;

export type BodySerializerAdapters = {
  default: BodySerializerAdapter;
  [adapterType: string]: BodySerializerAdapter;
};
