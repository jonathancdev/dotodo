const months = [
  [1, "January"],
  [2, "February"],
  [3, "March"],
  [4, "April"],
  [5, "May"],
  [6, "June"],
  [7, "July"],
  [8, "August"],
  [9, "September"],
  [10, "October"],
  [11, "November"],
  [12, "December"],
];

const calculateDays = (month) => {
  let days = 0;
  if (
    month == 1 ||
    month == 3 ||
    month == 5 ||
    month == 7 ||
    month == 8 ||
    month == 10 ||
    month == 12
  ) {
    days = 31;
  } else if (month == 4 || month == 6 || month == 9 || month == 11) {
    days = 30;
  } else if (month == 2) {
    days = 28;
  }
  let array = [];
  for (let i = 1; i <= days; i++) {
    array.push(i);
  }
  console.log(days);
  return array;
};

const numToMonth = (num) => {
  const monthString = months.filter((month) => month[0] == num)[0][1];
  return monthString.substring(0, 3);
};

export { months, calculateDays, numToMonth };
