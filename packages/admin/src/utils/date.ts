import * as moment from 'moment';

moment.locale('ru');

export function dateTimeFormat(date: number | Date | string): string {
  return moment(date).format('DD.MM.YYYY HH:mm');
}

export function dateFormat(
  date: number | Date | string,
  isFull?: boolean,
): string {
  return moment(date).format(isFull ? 'DD.MM.YYYY, HH:mm' : 'DD.MM.YYYY');
}

export function timeFormat(date: number | Date | string): string {
  return moment(date).format('HH:mm');
}

export function dateISOFormat(date: Date): string {
  return `${moment(date).format('YYYY-MM-DDTHH:mm:ss.SSS')}Z`;
  // return date.toISOString(); - Not work approach
}

export function getMonthName(monthNumber: number): string {
  return moment()
    .month(monthNumber)
    .format('MMMM');
}

export function getMonthYear(date: string): string {
  const month = Number(date?.slice(0, 2)) - 1;
  const year = Number(date?.slice(3, 7));
  return `${getMonthName(month)} ${year}`; 
}

export function getMonthNameUpper(monthNumber: number): string {
  const month = getMonthName(monthNumber);
  return month.charAt(0).toUpperCase() + month.slice(1);
}

export function getMonthNameUpperShort(monthNumber: number): string {
  if (monthNumber === 4) return 'Май';
  const month = getMonthName(monthNumber);
  return `${month.charAt(0).toUpperCase()}${month.slice(1, 3)}.`;
}

export const isDefined = (value: any) => value !== null && value !== undefined;

export const formatToDateString = (date: Date | string) => {
  let dateDisplay;
  const dateDate = new Date(date);

  if (Number.isNaN(dateDate.getTime())) {
    dateDisplay = date;
  } else {
    dateDisplay = new Intl.DateTimeFormat('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(dateDate);
  }

  return dateDisplay;
};

export const formatDaysLeftFrom = (date: Date | string) => {
  return Math.max(
    0,
    moment(date)
      .startOf('day')
      .diff(moment().startOf('day'), 'days'),
  ).toString();
};
