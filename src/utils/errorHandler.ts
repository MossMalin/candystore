export const errorHandler = (error: unknown): void => {
  if (error instanceof Error) {
    console.log(error.message);
  } else {
    console.log('Okänt fel');
  }
  alert('Ett fel uppstod. Vänligen försök igen.');
};
