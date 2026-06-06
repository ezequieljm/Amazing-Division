import { describe, test, expect } from '@jest/globals';
import { div } from '../src/div';

describe('Module 1 - Math Operations (Naive Version)', () => {

    test('Should successfully divide two positive numbers', () => {
        const result = div(10, 2);
        expect(result).toBe(5);
    });

    test('Should successfully divide by a negative number', () => {
        const result = div(10, -2);
        expect(result).toBe(-5);
    });

});