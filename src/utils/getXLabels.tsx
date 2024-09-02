const xLabels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getXLabels =  (mon: number) => {
  let now = new Date();
  let month = !mon? now.getMonth() : mon;
  let aLabels = xLabels.slice(0, month - 1 );
  let bLabels = xLabels.slice(month -1 , xLabels.length)
  let _xLabels = [...bLabels, ...aLabels];
  return _xLabels;
};

export default getXLabels;
