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

    const GM_xmlhttpRequest: (option: any) => { abort: () => void };
}