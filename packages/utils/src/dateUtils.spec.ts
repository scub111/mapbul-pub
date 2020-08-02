import { formatDateToString, dateTimeFormat } from './dateUtils';

describe('dateUtils', () => {
  describe('formatDateToString', () => {
    it('formatDateToString method with null', () => {
      const result = formatDateToString(null);
      expect(result).toBe('');
    });

    it('formatDateToString method with undefined', () => {
      const result = formatDateToString(undefined);
      expect(result).toBe('');
    });

    it('formatDateToString method from date', () => {
      const result = formatDateToString(new Date(2019, 11, 25));
      expect(result).toBe('25/12/2019');
    });

    it('formatDateToString method from date string', () => {
      const result = formatDateToString(new Date('2019-06-20T09:10:59.000Z'));
      expect(result).toBe('20/06/2019');
    });

    it('formatDateToString method from date string close to end of day', () => {
      const result = formatDateToString(new Date('2017-12-31T21:00:00.000Z'));
      expect(result).toBe('01/01/2018');
    });

    it('formatDateToString method from string close to end of day', () => {
      const result = formatDateToString('2017-12-31T21:00:00.000Z');
      expect(result).toBe('01/01/2018');
    });
  });

  describe('dateTimeFormat', () => {
    it('dateTimeFormat method with null', () => {
      const result = dateTimeFormat(null);
      expect(result).toBe('');
    });

    it('dateTimeFormat method with undefined', () => {
      const result = dateTimeFormat(undefined);
      expect(result).toBe('');
    });

    it('dateTimeFormat method with z-time', () => {
      const result = dateTimeFormat('2017-12-25T21:00:00.000Z');
      expect(result).toBe('2017-12-26 00:00:00');
    });

    it('dateTimeFormat method with null', () => {
      const result = dateTimeFormat('2017-12-31');
      expect(result).toBe('2017-12-31 00:00:00');
    });
  });
});
