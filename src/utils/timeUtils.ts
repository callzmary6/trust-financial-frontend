export const isoStringToDate = (isoString: string): string => {
  const date = new Date(isoString ?? '');
  const day = date.getDate(); // Get the day of the month
  const month = date.toLocaleString('default', { month: 'short' }); // Get abbreviated month name
  return `${day} ${month}`;
};

export const isoStringToDay = (isoString: string): string => {
  const date = new Date(isoString ?? '');
  const day = date.toLocaleString('default', { weekday: 'long' }); // Get full day name
  return day;
};


export const formatToWeekDay = (isoString: string | undefined): string => {
  const date = new Date(isoString ?? '');
  return date.toLocaleDateString('en-US', {
      weekday: 'short',  // Wed
      month: 'short',    // Dec
      day: 'numeric',    // 18
      year: 'numeric',   // 2024
  });
};
