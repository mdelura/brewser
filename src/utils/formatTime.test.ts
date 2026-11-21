import { describe, expect, it } from 'vitest';
import { formatTime } from './formatTime';

describe('formatTime', () => {
    it.each([
        [0, '00:00'],
        [5, '00:05'],
        [45, '00:45'],
        [60, '01:00'],
        [225, '03:45'],
    ])('formats %i seconds as %s', (input, expected) => {
        expect(formatTime(input)).toBe(expected);
    });
});
