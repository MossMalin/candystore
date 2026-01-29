export const errorHandler = (error: unknown): string => {
  if (error instanceof Error) {
    console.log(error.message);
  } else {
    console.log('Okänt fel');
  }
  return 'Ett fel uppstod. Vänligen försök igen.';
};
