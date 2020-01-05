export interface TreeItem<T = undefined> {
    id: string;
    name: string;
    code: string;
    icon?: string;
    children: TreeItem<T>[];
    data: T;
};