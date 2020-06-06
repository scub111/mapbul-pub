import { PROCESS_TYPE } from 'interfaces';
export declare function getTypeByUrlType(type: string): PROCESS_TYPE;
export declare const generateProductUrl: (root: string, type: PROCESS_TYPE, id: string, options?: any) => string;
