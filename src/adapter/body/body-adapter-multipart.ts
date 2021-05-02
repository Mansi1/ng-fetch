import { BodySerializerAdapter } from '../../interface/body-serializer-adapter';

export const convertRequestToFormData = (request: any, formData = new FormData(), prefix = '') => {
  Object.entries(request).forEach((entry) => {
    const [key, value] = entry;
    const newKeyPrefix = `${prefix}${key}`;
    if (Array.isArray(value)) {
      value.forEach((arrValue) => convertRequestToFormData(arrValue, formData, `${newKeyPrefix}[]`));
    } else if (typeof value === 'object' && value.constructor.name !== 'File') {
      convertRequestToFormData(value, formData, newKeyPrefix);
    } else if (typeof value === 'boolean') {
      formData.append(newKeyPrefix, value ? '1' : '0');
    } else {
      formData.append(newKeyPrefix, value as any);
    }
  });
  return formData;
};

export const BodyAdapterMultipartFormData: BodySerializerAdapter = (data: any) => convertRequestToFormData(data);
