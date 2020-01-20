import moment from 'moment';

export const formatDateToString = (date: Date | null): string => {
  if (!date) {
    return '';
  }
  return moment(date).format('DD/MM/YYYY');
};
