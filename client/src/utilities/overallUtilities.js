//converting date format:
export const readableDate = (date) => {
  const inputDate = new Date(date);
  const option = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", option).format(
    inputDate
  );
  return formattedDate;
};
