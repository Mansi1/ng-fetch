import {Config,BodySerializerAdapter} from "../interface";

export const bodyToBuffer = (config: Config, contentType: string, body: any): unknown => {
    if (typeof body !== 'undefined') {
        if (body instanceof FormData) {
            return body;
        } else {
            let cleanContentType = contentType.split(';').shift().toLowerCase().trim();
            let serializer: BodySerializerAdapter = config.bodySerializers[cleanContentType] || config.bodySerializers.default;
            return serializer(body);
        }
    }
}