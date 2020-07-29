// import moment from 'moment';

// export const formatDateToString = (date: Date | null | undefined): string => {
//   if (!date) {
//     return '';
//   }
//   return moment(date).format('DD/MM/YYYY');
// };

import dayjs from 'dayjs';

export const formatDateToString = (date: Date | null | undefined): string => {
  if (!date) {
    return '';
  }
  return dayjs(date).format('DD/MM/YYYY');
};
