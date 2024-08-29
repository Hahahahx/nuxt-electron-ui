function test(regexp: RegExp) {
  return (v: any) => regexp.test(v)
}

const ip = test(
  /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
)

const cidr = test(
  /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\/([1-9]|[12]\d|3[0-2])$/,
)
const cidrZero = test(
  /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\/(\d|[12]\d|3[0-2])$/,
)

const MAC = test(
  /[A-F0-9]{2}:[A-F0-9]{2}:[A-F0-9]{2}:[A-F0-9]{2}:[A-F0-9]{2}:[A-F0-9]{2}/i,
)

const email = test(
  /^([a-z0-9])(\w|\\-)+@[a-z0-9]+\.([a-z]{2,4})$/i,
)
const id = test(
  /(^\d{15}$)|(^\d{18}$)|(^\d{17}([\dX])$)/i,
)

const phone = test(/^1[3-9,]\d{9}$/)

function compareMinAndMax(value: number, min: number, max: number) {
  value = Number(value)
  return value >= min && value <= max
}

export const verify = {
  test,
  ip,
  cidr,
  cidrZero,
  MAC,
  email,
  id,
  phone,
  compareMinAndMax,
}
