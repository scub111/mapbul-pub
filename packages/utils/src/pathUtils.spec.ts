import { createPath, createPathEx } from './pathUtils';

describe('pathUtils', () => {
  it('createPath complex test', () => {
    const result = createPath({
      endpoint: 'https://test.com/documents',
      queryParams: {
        page: 0,
        size: 50,
        sort: 'sort1,asc',
      },
    });
    expect(result).toBe('https://test.com/documents?page=0&size=50&sort=sort1%2Casc');
  });

  it('createPath complex test with undefined', () => {
    const result = createPath({
      endpoint: 'https://test.com/documents',
      queryParams: {
        page: 0,
        size: 50,
        sort: undefined,
      },
    });
    expect(result).toBe('https://test.com/documents?page=0&size=50');
  });

  it('createPathEx complex test', () => {
    const result = createPathEx({
      endpoint: 'https://test.com/documents',
      queryParams: [
        { key: 'page', value: 0 },
        { key: 'size', value: 50 },
        { key: 'sort', value: 'sort1,asc' },
        { key: 'sort', value: 'sort2,asc' },
      ],
    });
    expect(result).toBe('https://test.com/documents?page=0&size=50&sort=sort1%2Casc&sort=sort2%2Casc');
  });

  it('createPathEx complex test with undefined and null', () => {
    const result = createPathEx({
      endpoint: 'https://test.com/documents',
      queryParams: [
        { key: 'page', value: 0 },
        { key: 'size', value: 50 },
        { key: 'sort', value: undefined },
        { key: 'sort', value: null },
      ],
    });
    expect(result).toBe('https://test.com/documents?page=0&size=50');
  });
});
