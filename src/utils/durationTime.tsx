import moment from "moment";

export function durationTimeCheckOut(check_in: any, check_out: any, setting_time: any) {
  if (parseInt(moment.duration(check_out.diff(check_in)).asHours().toFixed(0)) <= 0) {
    return {
      action: false, check_in: check_in, check_out: check_out,
      rounding: false
    }
  } else {
    const number_time = moment.duration(check_out.diff(check_in)).asHours().toFixed(2)
    const check_time = (parseInt(setting_time) / 60).toFixed(2);
    if (parseInt(number_time.split('.')[1]) > parseInt(check_time.split('.')[1])) {
      return {
        action: true, check_in: check_in, check_out: check_out.add((1 - parseFloat('0.' + check_time.split('.')[1])) * 100 * 0.6, 'minute'),
        rounding: true
      }
    } else {
      return {
        action: true, check_in: check_in, check_out: check_out,
        rounding: false
      }
    }
  }
}

export function checkNumberTime(currentMinutes: any) {
  let number: any
  if (currentMinutes.toString().length == 1) {
    number = "0" + currentMinutes;
  } else {
    number = currentMinutes
  }
  return number
}