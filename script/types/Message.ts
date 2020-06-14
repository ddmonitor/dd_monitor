export type ScriptMessage =
    "M_SCRIPT_INIT" |
    "M_OPEN_U_LINK" |
    "M_BILI_RESPONSE" |

    "M_ERROR";

export interface ScriptMessageTypeMap  {
    "M_BILI_RESPONSE": {
        code: number;
        message: string;
        data: any;
        ttl: number;
    };
}

export interface ScriptMessageEvent<T extends ScriptMessage> extends MessageEvent {
    data: {
        type: T;
        data: T extends keyof ScriptMessageTypeMap
            ? (ScriptMessageTypeMap[T] & { $rsp: true })
            : any;
    };
}