import {BodySerializerAdapter} from "../../interface/body-serializer-adapter";
import {Buffer} from "../../polyfill/buffer";

export const BodyAdapterJson: BodySerializerAdapter = (data:any, options)  => {
   return Buffer.from(JSON.stringify(data), options?.charset || "utf-8");
}