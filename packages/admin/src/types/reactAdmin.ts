import { ReactChildren } from 'react';

/**
 * Types to eventually add in react-admin
 */

export declare type Identifier = string | number;

export interface FieldProps<T> {
   basePath?: string;
   history?: any;
   id?: Identifier;
   location?: any;
   match?: any;
   record?: T;
   resource?: string;
   isEdit?: boolean;
}

export interface ReferenceFieldProps<T> extends FieldProps<T> {
   reference: string;
   children: ReactChildren;
   link?: string | false;
   sortBy?: string;
}
