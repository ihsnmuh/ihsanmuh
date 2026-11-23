import { describe, expect, it } from 'vitest';

import { filteringObject } from '@/helpers/filteringObject';

describe('filteringObject', () => {
  it('should remove undefined values', () => {
    const input = { a: 1, b: undefined, c: 3 };
    const result = filteringObject(input);
    expect(result).toEqual({ a: 1, c: 3 });
  });

  it('should remove null values', () => {
    const input = { a: 'test', b: null, c: 'value' };
    const result = filteringObject(input);
    expect(result).toEqual({ a: 'test', c: 'value' });
  });

  it('should remove empty strings', () => {
    const input = { a: 'hello', b: '', c: 'world' };
    const result = filteringObject(input);
    expect(result).toEqual({ a: 'hello', c: 'world' });
  });

  it('should remove all falsy values (undefined, null, empty string)', () => {
    const input = {
      name: 'John',
      age: undefined,
      email: null,
      phone: '',
      city: 'Jakarta',
    };
    const result = filteringObject(input);
    expect(result).toEqual({ name: 'John', city: 'Jakarta' });
  });

  it('should keep zero values', () => {
    const input = { a: 0, b: null, c: 5 };
    const result = filteringObject(input);
    expect(result).toEqual({ a: 0, c: 5 });
  });

  it('should keep false boolean values', () => {
    const input = { isActive: false, isDeleted: null, isPublished: true };
    const result = filteringObject(input);
    expect(result).toEqual({ isActive: false, isPublished: true });
  });

  it('should handle empty objects', () => {
    const input = {};
    const result = filteringObject(input);
    expect(result).toEqual({});
  });

  it('should handle objects with only falsy values', () => {
    const input = { a: undefined, b: null, c: '' };
    const result = filteringObject(input);
    expect(result).toEqual({});
  });

  it('should handle objects with nested structures', () => {
    const input = {
      name: 'Test',
      data: { nested: 'value' },
      empty: null,
    };
    const result = filteringObject(input);
    expect(result).toEqual({ name: 'Test', data: { nested: 'value' } });
  });

  it('should keep arrays even if empty', () => {
    const input = { items: [], count: 0, name: null };
    const result = filteringObject(input);
    expect(result).toEqual({ items: [], count: 0 });
  });

  it('should handle string values with whitespace', () => {
    const input = { a: ' ', b: '\n', c: null, d: 'text' };
    const result = filteringObject(input);
    expect(result).toEqual({ a: ' ', b: '\n', d: 'text' });
  });

  it('should preserve object with all valid values', () => {
    const input = {
      id: 1,
      name: 'Test',
      active: true,
      score: 0,
    };
    const result = filteringObject(input);
    expect(result).toEqual(input);
  });

  it('should not mutate original object', () => {
    const input = { a: 1, b: null, c: 3 };
    const inputCopy = { ...input };
    filteringObject(input);
    expect(input).toEqual(inputCopy);
  });
});
