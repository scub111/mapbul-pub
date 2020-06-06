import { plural } from './textUtils';

const zeroDecimalsFormatter = new Intl.NumberFormat('ru-RU', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatZeroDecimals(value: number | string) {
  return zeroDecimalsFormatter.format(Number(value));
}

const twoDecimalsFormatter = new Intl.NumberFormat('ru-RU', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatWithTwoDecimals(value: number | string) {
  return twoDecimalsFormatter.format(Number(value));
}

export function formatWithTwoDecimalsRub(value: number) {
  return `${formatWithTwoDecimals(value)} ₽`;
}

export const showRecords = (num: number) =>
  num + ' ' + plural(num, ['запись', 'записи', 'записей']);

export const showMonths = (num: number) =>
  num + ' ' + plural(num, ['месяц', 'месяца', 'месяцев']);

export const showPeople = (num: number) =>
  num + ' ' + plural(num, ['человек', 'человека', 'человек']);
