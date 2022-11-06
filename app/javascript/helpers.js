export const dateHelper = {
  humanify: (dateString, options = {}) => {
    const isoDate = new Date(dateString);
    const delimiter = options.delimiter || '/';
    const year = isoDate.getFullYear();
    const month = isoDate.getMonth();
    const date = isoDate.getDate();
    return `${date}${delimiter}${month}${delimiter}${year}${delimiter}`;
  },
};
