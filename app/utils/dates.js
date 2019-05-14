const dateOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
};
// eslint-disable-next-line
export const convertDateToLocaleString = (date = new Date()) => new Date(date).toLocaleDateString(undefined, dateOptions);
export const convertToTime = (date = new Date()) => new Date(date).getTime();
