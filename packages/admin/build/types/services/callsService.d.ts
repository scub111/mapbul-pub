import { ICallFormData, IRequestFormData } from 'interfaces';
export interface SignResponse {
    data: string;
}
export declare function create(data: ICallFormData): Promise<void>;
export declare function createSign(data: ICallFormData): Promise<SignResponse>;
export declare function create2(data: IRequestFormData): Promise<void>;
