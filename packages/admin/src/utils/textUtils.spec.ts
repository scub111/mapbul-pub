import { plural, getTextLimitIndex, getTextLength } from './textUtils';

describe('plural', () => {
  const dictionary = ['день', 'дня', 'дней'];

  it('number = 1', () => {
    const result = plural(1, dictionary);
    expect(result).toBe(dictionary[0]);
  });

  it('number = 2', () => {
    const result = plural(2, dictionary);
    expect(result).toBe(dictionary[1]);
  });

  it('number = 5', () => {
    const result = plural(5, dictionary);
    expect(result).toBe(dictionary[2]);
  });

  it('number = 15', () => {
    const result = plural(15, dictionary);
    expect(result).toBe(dictionary[2]);
  });

  it('number = 25', () => {
    const result = plural(25, dictionary);
    expect(result).toBe(dictionary[2]);
  });

  it('number = 101', () => {
    const result = plural(101, dictionary);
    expect(result).toBe(dictionary[0]);
  });

  it('number = 1332', () => {
    const result = plural(1332, dictionary);
    expect(result).toBe(dictionary[1]);
  });
});

describe('getTextLength', () => {
  it('English lower 14px', () => {
    const result = getTextLength('abcdefghijklmnopqrstuvwxyz', 14);
    expect(result).toBe(205);
  });
  it('English lower 16px', () => {
    const result = getTextLength('abcdefghijklmnopqrstuvwxyz');
    expect(result).toBe(234);
  });
  it('English lower 14px', () => {
    const result = getTextLength('abcdefghijklmnopqrstuvwxyz abcdefghijklmnopqrstuvwxyz', 14);
    expect(result).toBe(415);
  });
  it('English lower 16px', () => {
    const result = getTextLength('abcdefghijklmnopqrstuvwxyz abcdefghijklmnopqrstuvwxyz');
    expect(result).toBe(474);
  });
  it('Misc', () => {
    const result = getTextLength('ИНДИВИДУАЛЬНЫЙ "предриниматель":;, ЛЕБЕДЕВ123 алексей ВЛАДИМИРОВИЧ');
    expect(result).toBe(633);
  });
});

describe('getTextLimitIndex', () => {
  it('English lower, limit 1000', () => {
    const result = getTextLimitIndex('abcdefghijklmnopqrstuvwxyz', 1000);
    expect(result).toBe(0);
  });
  it('English lower, limit 300', () => {
    const result = getTextLimitIndex('abcdefghijklmnopqrstuvwxyz abcdefghijklmnopqrstuvwxyz', 300);
    expect(result).toBe(33);
  });
  it('English upper, limit 300', () => {
    const result = getTextLimitIndex('ABCDEFGHIJKLMNOPQRSTUVWXYZ ABCDEFGHIJKLMNOPQRSTUVWXYZ', 300);
    expect(result).toBe(27);
  });
  it('Russian lower, limit 300', () => {
    const result = getTextLimitIndex('абвгдеёжзийклмнопрстуфхцчшщъыьэюя абвгдеёжзийклмнопрстуфхцчшщъыьэюя', 300);
    expect(result).toBe(33);
  });
  it('Russian upper, limit 300', () => {
    const result = getTextLimitIndex('АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ', 300);
    expect(result).toBe(27);
  });
  it('Number upper, limit 300', () => {
    const result = getTextLimitIndex('0123456789 0123456789 0123456789 0123456789', 300);
    expect(result).toBe(34);
  });
  it('Misc, limit 300', () => {
    const result = getTextLimitIndex('ИНДИВИДУАЛЬНЫЙ "предриниматель":;, ЛЕБЕДЕВ123 алексей ВЛАДИМИРОВИЧ', 300);
    expect(result).toBe(31);
  });
});
