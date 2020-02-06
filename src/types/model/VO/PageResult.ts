export default interface PageResult<T> {
    current: number;
    size: number;
    pages: number;
    total: number;
    data: T[];
}