import moment from 'moment';

export const formatDateToString = (date: Date | null | undefined): string => {
  if (!date) {
    return '';
  }
  return moment(date).format('DD/MM/YYYY');
};
