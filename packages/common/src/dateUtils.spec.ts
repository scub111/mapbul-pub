import { formatDateToString } from './dateUtils';

describe('dateUtils', () => {
  describe('root', () => {
    it('formatDateToString method with undefined', () => {
      const result = formatDateToString(undefined);
      expect(result).toBe('');
    });

    it('formatDateToString method', () => {
      const result = formatDateToString(new Date(2019, 11, 25));
      expect(result).toBe('25/12/2019');
    });
  });
});
