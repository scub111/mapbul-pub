import { ICompany, ICompanyMeta, TRole } from 'interfaces';

export class Company implements ICompany {
  public static async New(init: ICompany) {
    return new Company(init);
  }

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

  constructor(init: ICompany) {
    this.id = init.id;
    this.nodeAlias = init.nodeAlias;
    this.name = init.name;
    this.shortName = init.shortName;
    this.type = init.type;
    this.address = init.address;
    this.phone = init.phone;
    this.email = init.email;
    this.ogrn = init.ogrn;
    this.inn = init.inn;
    this.kpp = init.kpp;
    this.meta = init.meta;
  }
}
