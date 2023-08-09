export const generateTime = () => {
  const minutes = String(new Date().getMinutes()).padStart(2, '0');

  const hours = String(new Date().getHours()).padStart(2, '0');

  return `${hours}:${minutes}`;
};
