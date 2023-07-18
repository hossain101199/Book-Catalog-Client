const formatDate = (dateString: string) => {
  const dateObject = new Date(dateString);
  const day = dateObject.getUTCDate();
  const month = dateObject.getUTCMonth() + 1; // Months are zero-based, so add 1
  const year = dateObject.getUTCFullYear();

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${formattedDay}-${formattedMonth}-${year}`;
};

export default formatDate;
