import {BodySerializerAdapter} from "../../interface";
import {Buffer} from "../../polyfill/buffer";

export const BodyAdapterJson: BodySerializerAdapter = (data:any, options)  => {
   return Buffer.from(JSON.stringify(data), options?.charset || "utf-8");
}