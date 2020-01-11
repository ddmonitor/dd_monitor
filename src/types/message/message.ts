export type Messages =
    "M_OPEN_U_LINK" |
    "M_UNKNOWN"
    ;
export interface MessageData<T = any> {
    type: Messages;
    source: string | null;
    data: T;
}
export interface ComponentMessageEvent extends MessageEvent {
    data: MessageData;
}