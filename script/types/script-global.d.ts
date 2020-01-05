import { Dictionary } from "array-proto-ext";
import { LoDashStatic } from "lodash";
declare global {

    const _: LoDashStatic;

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
}