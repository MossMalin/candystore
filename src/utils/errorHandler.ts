export const errorHandler = (error: unknown): string => {
  if (error instanceof Error) {
    return `An error occurred. Please try again later. ${error.message}`;
  }
  return 'An error occurred. Please try again later.';
};
