function merticBase(
  level: string[] = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
) {
  return function <T>(bytes: number, format?: (btyes: any, symbols: any) => T) {
    if (Number.isNaN(bytes))
      return '' as T

    const symbols = level
    let exp = Math.floor(Math.log(bytes) / Math.log(2))
    if (exp < 1)
      exp = 0

    const i = Math.floor(exp / 10)
    bytes = bytes / 2 ** (10 * i)

    if (bytes.toString().length > bytes.toFixed(2).toString().length)
      bytes = Number(bytes.toFixed(2))

    if (format)
      return format(bytes, symbols[i]) as T

    return bytes + symbols[i] as T
  }
}

const mertic = merticBase()
const merticKB = merticBase(['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'])
const merticMB = merticBase(['MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'])
const merticGB = merticBase(['GB', 'TB', 'PB', 'EB', 'ZB', 'YB'])
const merticTB = merticBase(['TB', 'PB', 'EB', 'ZB', 'YB'])

type Fixed = 'floor' | 'ceil' | 'round'

function k2g(KB: number = 0, fixed: Fixed = 'round') {
  return Math[fixed](KB / (1024 ** 2))
}

function k2t(KB: number = 0, fixed: Fixed = 'round') {
  return Math[fixed](KB / (1024 ** 3))
}

function k2m(KB: number = 0, fixed: Fixed = 'round') {
  return Math[fixed](KB / (1024 ** 1))
}

function m2k(MB: number = 0, fixed: Fixed = 'round') {
  return Math[fixed](MB * (1024 ** 1))
}

function m2g(MB: number = 0, fixed: Fixed = 'round') {
  return Math[fixed](MB / (1024 ** 1))
}

function m2t(MB: number = 0, fixed: Fixed = 'round') {
  return Math[fixed](MB / (1024 ** 2))
}

function g2k(GB: number = 0, fixed: Fixed = 'round') {
  return Math[fixed](GB * (1024 ** 2))
}

function g2m(GB: number = 0, fixed: Fixed = 'round') {
  return Math[fixed](GB * (1024 ** 1))
}

function g2t(GB: number = 0, fixed: Fixed = 'round') {
  return Math[fixed](GB / (1024 ** 1))
}

function t2k(TB: number = 0, fixed: Fixed = 'round') {
  return Math[fixed](TB * (1024 ** 3))
}

function t2m(TB: number = 0, fixed: Fixed = 'round') {
  return Math[fixed](TB * (1024 ** 2))
}

function t2g(TB: number = 0, fixed: Fixed = 'round') {
  return Math[fixed](TB * (1024 ** 1))
}

export const byteTrans = {
  mertic,
  merticKB,
  merticMB,
  merticGB,
  merticTB,
  k2g,
  k2t,
  k2m,
  m2k,
  m2g,
  m2t,
  g2k,
  g2m,
  g2t,
  t2g,
  t2m,
  t2k,
}
