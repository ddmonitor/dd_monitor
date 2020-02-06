import { Dictionary } from "lodash";
declare global {
    const unsafeWindow: Window & Dictionary<any>;

    interface GMInfo {
        script: Dictionary<any>;
        scriptMetaStr: string;
        scriptSource: string;
        scriptWillUpdate: boolean;
        scriptUpdateURL?: string;
        version: string;
        scriptHandler: string;
        isIncognito: boolean;
        downloadMode: string;
        toString: () => string;
    }
    const GM: {
        readonly info: GMInfo;
    };
    const GM_info: GMInfo;

    interface XhrOptions {
        method: "GET" | "POST" | "HEAD";
        url: string;
        headers: Dictionary<string>;
        data: string;
    }

    type PropertyName<T> = {
        [P in keyof T]: Exclude<T[P], null | undefined> extends (...args: any[]) => any ? never : P;
    }[keyof T];

    type XhrObject = {
        [K in PropertyName<XMLHttpRequest>]: XMLHttpRequest[K]
    };
    const GM_xmlhttpRequest: (option: Partial<XhrOptions & {
        onload: (response: XhrObject) => void;
        onerror: (e: any) => void;
    }>) => { abort: () => void };
}