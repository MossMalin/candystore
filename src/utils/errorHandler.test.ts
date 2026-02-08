import { describe, it, expect } from 'vitest';
import { errorHandler } from './errorHandler';

describe('errorHandler', () => {
  it('should return error message for Error instance', () => {
    const err = new Error('Something went wrong');
    const result = errorHandler(err);
    expect(result).toContain('Something went wrong');
    expect(result).toContain('An error occurred. Please try again later.');
  });

  it('should return generic message for unknown error', () => {
    const result = errorHandler('not an error');
    expect(result).toBe('An error occurred. Please try again later.');
  });

  it('should return generic message for undefined', () => {
    const result = errorHandler(undefined);
    expect(result).toBe('An error occurred. Please try again later.');
  });
});
