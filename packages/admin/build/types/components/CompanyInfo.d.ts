import * as React from 'react';
import { BoxProps } from 'grommet';
import { IStyledProps } from 'themes';
declare type TProps = {
    name: string;
    ogrn: string;
    inn: string;
    kpp: string;
    directorFullName?: {
        lastName: string;
        firstName: string;
        middleName: string;
    };
} & IStyledProps & BoxProps;
export declare const CompanyInfo: React.FC<TProps>;
export {};
