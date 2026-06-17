import { describe, test, expect } from '@jest/globals';
import { safediv } from '../src/safediv';

describe('safediv', () => {
    
    test('Must return a Success object with the value 2 when dividing 4 by 2', () => {
        const result = safediv(4, 2);
        expect(result.tag).toBe('success');
        if (result.tag === 'success') expect(result.value).toBe(2);
    });

    test('Must return a Failure object when attempting to divide by zero', () => {
        const result = safediv(4, 0);
        expect(result.tag).toBe('failure');
        if (result.tag === 'failure') expect(result.value).toBe('Division by zero is not allowed');
    });

});

