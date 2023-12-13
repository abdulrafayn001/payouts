export const convertTimeFormat = (dbTimeFormat: string): string => {
  const date = new Date(dbTimeFormat);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "UTC",
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
};
