export const errorHandler = (error: unknown): string => {
  if (error instanceof Error) {
    console.log(error.message);
  } else {
    console.log('Okänt fel');
  }
  return 'An error occurred. Please try again later.';
};
