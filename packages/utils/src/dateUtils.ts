import dayjs from 'dayjs';

export const formatDateToString = (date: Date | string | null | undefined): string => {
  if (!date) {
    return '';
  }
  return dayjs(date).format('DD/MM/YYYY');
};

export function dateTimeFormat(date: number | Date | string | null | undefined): string {
  if (!date) {
    return '';
  }
  return dayjs(date).format('YYYY-DD-MM HH:mm:ss');
}
