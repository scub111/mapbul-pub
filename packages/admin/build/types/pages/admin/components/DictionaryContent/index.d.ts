import * as React from 'react';
import './table.scss';
import { ListStoreConstructor } from 'stores/core/ListStoreConstructor';
interface IDictionaryContentProps<T> {
    caption: React.ReactNode;
    columns: any[];
    store: ListStoreConstructor<T>;
    allowCreate?: (data: T) => boolean;
    allowPrivateEdit?: (data: T) => boolean;
    allowEdit?: (data: T) => boolean;
    disablePrivateEdit?: (data: T) => boolean;
    disableEdit?: (data: T) => boolean;
    allowDelete?: (data: T) => boolean;
    disableDelete?: (data: T) => boolean;
    dataFn?: (data: Array<T>) => Array<T>;
    onCreateClick?: () => void;
    onPrivateEditClick?: (data: T) => void;
    onEditClick?: (data: T) => void;
    onRemoveClick?: (data: T) => void;
}
export declare const DictionaryContent: <T extends object>({ caption: Caption, columns, store, allowCreate, allowPrivateEdit, allowEdit, disablePrivateEdit, disableEdit, allowDelete, disableDelete, onCreateClick, onPrivateEditClick, onEditClick, onRemoveClick, }: IDictionaryContentProps<T>) => JSX.Element;
export {};
