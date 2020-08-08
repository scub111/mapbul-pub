import { P } from './reflection';

describe('reflection', () => {
  interface TestInterface {
    field1: number;
    field2: number;
    complex1: {
      field1: number;
      field2: number;
    };
  }

  it('field1', () => {
    const result = P<TestInterface>(p => p.field1);
    expect(result).toBe('field1');
  });

  it('field2', () => {
    const result = P<TestInterface>(p => p.field2);
    expect(result).toBe('field2');
  });

  it('complex1.field1', () => {
    const result = P<TestInterface>(p => p.complex1.field1);
    expect(result).toBe('complex1.field1');
  });

  it('complex1.field2', () => {
    const result = P<TestInterface>(p => p.complex1.field2);
    expect(result).toBe('complex1.field2');
  });
});
