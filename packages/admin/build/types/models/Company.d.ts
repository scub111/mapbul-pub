import { ICompany, ICompanyMeta, TRole } from 'interfaces';
export declare class Company implements ICompany {
    static New(init: ICompany): Promise<Company>;
    id: string;
    nodeAlias: string;
    name: string;
    shortName: string;
    type: TRole;
    address: string;
    phone: string;
    email: string;
    okpo?: string;
    ogrn: string;
    inn: string;
    kpp: string;
    meta: ICompanyMeta | null;
    constructor(init: ICompany);
}
