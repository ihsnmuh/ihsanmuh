import { describe, expect, it } from 'vitest';

import { timeReading } from '@/helpers/readingTime';

describe('timeReading', () => {
  it('should return reading time for short text', () => {
    const text = 'Hello world. This is a short test.';
    const result = timeReading(text);
    expect(result).toMatch(/(less than a minute read|\d+ min read)/);
  });

  it('should return "less than a minute read" for very short content', () => {
    const text = 'Short content here with just a few words.';
    const result = timeReading(text);
    expect(result).toBe('less than a minute read');
  });

  it('should calculate reading time for medium-length text', () => {
    const text = Array(150).fill('word').join(' ');
    const result = timeReading(text);
    expect(result).toMatch(/(less than a minute read|1 min read)/);
  });

  it('should calculate reading time for long text', () => {
    const text = Array(1000).fill('word').join(' ');
    const result = timeReading(text);
    expect(result).toMatch(/\d+ min read/);
    const minutes = parseInt(result);
    expect(minutes).toBeGreaterThan(2);
  });

  it('should handle empty string', () => {
    const result = timeReading('');
    expect(result).toBe('less than a minute read');
  });

  it('should handle text with special characters', () => {
    const text = 'Hello! How are you? This is a test. #testing @mention';
    const result = timeReading(text);
    expect(result).toMatch(/(less than a minute read|\d+ min read)/);
  });

  it('should handle text with numbers', () => {
    const text = '123 456 789 test 2024 numbers in text';
    const result = timeReading(text);
    expect(result).toMatch(/(less than a minute read|\d+ min read)/);
  });

  it('should handle multiline text', () => {
    const text = `
      First paragraph with some content.
      
      Second paragraph with more content.
      
      Third paragraph with additional text.
    `;
    const result = timeReading(text);
    expect(result).toMatch(/(less than a minute read|\d+ min read)/);
  });

  it('should handle markdown-like content', () => {
    const text = `
      # Heading
      
      This is a paragraph with **bold** and *italic* text.
      
      - List item 1
      - List item 2
      
      \`\`\`javascript
      const code = 'example';
      \`\`\`
    `;
    const result = timeReading(text);
    expect(result).toMatch(/(less than a minute read|\d+ min read)/);
  });

  it('should return consistent results for same input', () => {
    const text = Array(100).fill('test word content').join(' ');
    const result1 = timeReading(text);
    const result2 = timeReading(text);
    expect(result1).toBe(result2);
  });
});
