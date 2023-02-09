import moment from "moment";

export function checkDateValue(Date: number, Month: number, Hours: number, Minute: number) {
  // xet Date
  if (Date - 10 < 0) {
    var DateSet = '0' + Date.toString();
  } else {
    DateSet = Date.toString();
  }

  // xet Month
  if (Month - 10 < 0) {
    var MonthSet = '0' + Month.toString();
  } else {
    MonthSet = Month.toString();
  }

  //xet houre
  if (Hours - 10 < 0) {
    var HoureSet = '0' + Hours.toString();
  } else {
    HoureSet = Hours.toString();
  }

  //Xet Minus
  if (Minute - 10 < 0) {
    var MinuteSet = '0' + Minute.toString();
  } else {
    MinuteSet = Minute.toString();
  }
  return { DateSet, MonthSet, HoureSet, MinuteSet }
};

export function addTime(date: number, month: number, year: number) {
  let dayMoment = moment(date + '-' + month + '-' + year, 'DD-MM-YYYY');

  let endMonth = moment(date + '-' + month + '-' + year, 'DD-MM-YYYY').endOf('month');
  let diffMonth = moment.duration(endMonth.diff(dayMoment));

  let endYear = moment(date + '-' + month + '-' + year, 'DD-MM-YYYY').endOf('year');
  let diffYear = moment.duration(endYear.diff(dayMoment));

  let dateFormat = dayMoment.add(1, 'd');

  date = dateFormat.get('date');
  if (diffMonth.get('days') === 0) {
    let monthFormat = dayMoment.add(1, 'M');
    month = monthFormat.get('month');
  } else if (diffYear.get('day') === 0 && diffYear.get('month') === 0 && diffYear.get('year') === 0) {
    let dayFormat = dayMoment
    month = dayFormat.get('months')
    year = dayFormat.get('years');
  }

  return { date, month, year }
};
