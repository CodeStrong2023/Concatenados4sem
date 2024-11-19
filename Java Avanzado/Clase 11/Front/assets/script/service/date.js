export const uniqueDates = (tasks) => {
    const unique = [];

    tasks.forEach((task) => {
        if(!unique.includes(task.date)){
            unique.push(task.date);
        }
    });
    return unique;
};

export const orderDates = (dates) => { //Ordena cada fecha de la más antigua a la más moderna / futura
    return dates.sort((a, b) => {
      const firstDate = moment(a, "DD/MM/YYYY");
      const secondDate = moment(b, "DD/MM/YYYY");
      return firstDate - secondDate;
    }).map(date => moment(date, "YYYY-MM-DD").format("DD/MM/YYYY"));
  };

  export const orderTimes = (dates) => { //Ordena los horarios
    return dates.sort((a, b) => {
      const firstTime = moment(a, "LT");
      const secondTime = moment(b, "LT");
      return  firstTime - secondTime;
    });
  };