export type Messages =
    "M_INIT" |
    "M_SCRIPT_INIT" |
    "M_OPEN_U_LINK" |
    "M_ERROR" |
    "M_UNKNOWN" |

    "M_GET_BILI_USER" |
    "M_GET_BILI_LIVE"
    ;
export interface MessageData<T = any> {
    type: Messages;
    source: string | null;
    data: T;
}
export interface ComponentMessageEvent extends MessageEvent {
    data: MessageData;
}