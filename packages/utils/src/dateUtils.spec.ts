import { formatDateToString } from './dateUtils';

describe('dateUtils', () => {
  describe('root', () => {
    it('formatDateToString method with null', () => {
      const result = formatDateToString(null);
      expect(result).toBe('');
    });

    it('formatDateToString method with undefined', () => {
      const result = formatDateToString(undefined);
      expect(result).toBe('');
    });

    it('formatDateToString method', () => {
      const result = formatDateToString(new Date(2019, 11, 25));
      expect(result).toBe('25/12/2019');
    });

    it('formatDateToString method from string', () => {
      const result = formatDateToString(new Date('2019-06-20T09:10:59.000Z'));
      expect(result).toBe('20/06/2019');
    });
  });
});
