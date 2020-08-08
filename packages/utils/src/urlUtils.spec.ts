import { clearUrl } from './urlUtils';

describe('clearUrl', () => {
  it('Simple test', () => {
    const result = clearUrl('CategoryIcons\\aafb2a17-2d76-4321-8832-a6c89489b957.png');
    expect(result).toBe('CategoryIcons/aafb2a17-2d76-4321-8832-a6c89489b957.png');
  });
});