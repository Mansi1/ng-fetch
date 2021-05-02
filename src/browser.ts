import { Buffer } from 'buffer';

(globalThis as any).Buffer = Buffer;
window.Buffer = Buffer;
