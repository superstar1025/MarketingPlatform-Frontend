const defaultLocal = 'en-us';
const defaultOptions = {
  month: 'long', day: 'numeric', year: 'numeric'
};

export const getFormattedDate = (
  datetime: string | number,
  local: string = defaultLocal,
  options: object = defaultOptions
) => new Date(datetime).toLocaleDateString(local, options);
