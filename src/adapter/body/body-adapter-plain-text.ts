import {BodySerializerAdapter} from "../../interface/body-serializer-adapter";

export const BodyAdapterPlainText: BodySerializerAdapter = (data:string, options)  => {
    return Buffer.from(data, options?.charset || "utf-8");
}