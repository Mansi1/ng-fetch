import { File, FormData } from 'formdata-node';
import Blob from 'fetch-blob';

(globalThis as any).FormData = FormData;
(globalThis as any).File = File;
(globalThis as any).Blob = Blob;
