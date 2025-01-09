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

export const formatDateWithTime = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
}


export function formatDate(input: string): string {
  const date = new Date(input);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  };

  // Extract formatted parts
  const dateParts = date.toLocaleString('en-US', options).split(', ');
  const monthDayYear = dateParts[0].split('/');
  const timePart = dateParts[1];

  // Reformat date to 'MMM-DD-YYYY'
  const formattedDate = `${monthDayYear[0]}-${monthDayYear[1]}-${monthDayYear[2]}`;
  
  return `${formattedDate} ${timePart}`;
}