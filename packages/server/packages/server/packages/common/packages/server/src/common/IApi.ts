export type TID = number | string;

export interface IApi<T> {
    getAll(): Promise<T[]> | T[];
    postItem(item: T): T;
    putAll(item: T): T;
    deleteAll(): void;
    getItem(id: TID): T;
    putItem(id: TID): T;
    deleteItem(id: TID): T;
}
