// Fix: Import Jest globals to resolve TypeScript errors.
import { describe, it, expect } from '@jest/globals';
import { emotionToGenreMap } from '../../lib/emotionMapping';

describe('emotionToGenreMap', () => {
  it('should contain mappings for all expected emotions', () => {
    const emotions = ['neutral', 'happy', 'sad', 'angry', 'surprised', 'fearful'];
    emotions.forEach(emotion => {
      expect(emotionToGenreMap[emotion]).toBeDefined();
    });
  });

  it('should return a string of genres for each emotion', () => {
    for (const emotion in emotionToGenreMap) {
      expect(typeof emotionToGenreMap[emotion]).toBe('string');
      expect(emotionToGenreMap[emotion].length).toBeGreaterThan(0);
    }
  });

  it('should have specific genres for specific emotions', () => {
    expect(emotionToGenreMap.happy).toBe('happy,pop');
    expect(emotionToGenreMap.angry).toBe('rock,metal');
  });
});