import { clearUrl } from './urlUtils';

describe('urlUtils', () => {
  describe('root', () => {
    it('should return all data', async () => {
      const result = clearUrl('Articles\\123-234212342\\4242-2342');
      expect(result).toBe('Articles/123-234212342/4242-2342');
    });
  });
});
