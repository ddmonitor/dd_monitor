export interface R<T = any> {
    success: boolean;
    msg: string;
    code: number;
    data: T;
}