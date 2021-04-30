import {Runtime} from "./interface/runtime";

export const RUNTIME: Runtime = {
    browser: typeof window !== 'undefined' && typeof window.document !== 'undefined',
    node: typeof process !== 'undefined'
        && process.versions != null
        && process.versions.node != null
}