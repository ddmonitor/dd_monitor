export interface TreeItem<T = undefined> {
    id: string;
    name: string;
    children: TreeItem<T>[];
    data: T;
    code: string;
    icon?: string;
}

export interface BasicTree<T = undefined> {
    id: number;
    name: string;
    children: BasicTree<T>[];
    data: T;
}