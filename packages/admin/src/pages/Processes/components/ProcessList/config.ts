import { SOURCE_TYPE } from 'interfaces';

export const SOURCE_TYPE_MAP: Record<SOURCE_TYPE, string> = {
  BANK: 'Банк',
  OPERATOR: 'Оператор ЭДО',
};

export const COUNT_RISK_MAP: Record<any, string> = {
  false: 'Нет риска',
  true: 'Есть риск',
};
