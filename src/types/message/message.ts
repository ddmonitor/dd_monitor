export type Messages =
    "M_BILI_REQUEST"
    ;
export interface MessageData<T = any> {
    type: Messages;
    requestId: string;
    data: T;
}
export interface ComponentMessageEvent extends MessageEvent {
    data: MessageData;
}



export type ScriptMessage =
    "M_SCRIPT_INIT" |
    "M_OPEN_U_LINK" |

    "M_ERROR" |
    "M_UNKNOWN";

export interface ScriptMessageTypeMap {
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
        source?: string;
        requestId?: string;
        data: T extends keyof ScriptMessageTypeMap
            ? ScriptMessageTypeMap[T] : any;
    };
}