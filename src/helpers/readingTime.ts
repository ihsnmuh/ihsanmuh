import { readingTime } from 'reading-time-estimator';

export function timeReading(text: string) {
  const wpm = 275;
  const language = 'en';
  const result = readingTime(text, wpm, language);

  return result.text;
}
