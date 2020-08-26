import { getPasswordHash } from './passwordHash';

describe('passwordHash.', () => {
  describe('root', () => {
    it('possitive case', () => {
      expect(getPasswordHash("test")).toBe("098f6bcd4621d373cade4e832627b4f6");
    });
  });
});
