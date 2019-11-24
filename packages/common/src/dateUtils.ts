import moment from 'moment';

export const formatDateToString = (date: Date): string => {
  if (!date) {
    return '';
  }
  return moment(date).format('DD/MM/YYYY');
};
