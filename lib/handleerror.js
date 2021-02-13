export const ExitCode = {
  error: 1,
};

export const handleError = (err) => {
  if (err) {
    console.error(err.message);
    process.exit(ExitCode.error);
  }
};
