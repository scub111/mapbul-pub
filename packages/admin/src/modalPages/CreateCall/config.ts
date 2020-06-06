import { ISelectOption } from '@we-ui-components/base';

export const companyTypeOptions: Array<ISelectOption> = [
  {
    text: 'ИП',
    value: 'INDIVIDUAL_ENTREPRENEUR',
  },
  {
    text: 'Юридическое лицо',
    value: 'LEGAL_ENTITY',
  },
];

export const typeCompanyOptions: Array<ISelectOption> = [
  {
    text: 'Микробизнес',
    value: 1,
  },
  {
    text: 'Малый бизнес',
    value: 2,
  },
  {
    text: 'Средний бизнес',
    value: 3,
  },
  {
    text: 'Крупный бизнес',
    value: 0,
  },
];
