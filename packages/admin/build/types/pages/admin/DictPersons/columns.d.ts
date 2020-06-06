import { TParams } from 'interfaces';
import { UserInfo } from 'models';
export declare const columns: ({
    title: string;
    sortable: boolean;
    width: number;
    dataIndex: string;
    valueGetter: ({ data }: TParams<UserInfo>) => string;
    render: (value: any, data: UserInfo) => JSX.Element;
} | {
    title: string;
    sortable: boolean;
    width: number;
    dataIndex: string;
    render: (value: any, data: UserInfo) => JSX.Element;
    valueGetter?: undefined;
})[];
