import {FormData as NodeFormData} from "formdata-node"

export const FormData = (globalThis as any).FormData || NodeFormData