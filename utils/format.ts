import { format as datefns, formatDistanceToNow } from 'date-fns'
import zhLocale from 'date-fns/locale/zh-CN'

// ----------------------------------------------------------------------

const option = { locale: zhLocale }

function fDate(date?: string | number | Date, float = 1000) {
  if (!date)
    return ''
  return datefns(new Date(Number(date) * float), 'dd MMMM yyyy', option)
}

function fDateTime(date?: string | number, float = 1000) {
  if (!date)
    return ''
  return datefns(new Date(Number(date) * float), 'yyyy/MM/dd HH:mm', option)
}

function fDateTimes(date?: string | number | Date) {
  if (!date)
    return ''
  return datefns(new Date(date), 'yyyy/MM/dd HH:mm:ss', option)
}

function fDateTimeSuffix(date?: string | number | Date) {
  if (!date)
    return ''
  return datefns(new Date(date), 'dd/MM/yyyy hh:mm p', option)
}

function fToNow(date?: string | number | Date) {
  if (!date)
    return ''
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    ...option,
  })
}

export const format = {
  date: fDate,
  dateTime: fDateTime,
  dateTimeS: fDateTimes,
  dateTimeSuffix: fDateTimeSuffix,
  toNow: fToNow,
}
