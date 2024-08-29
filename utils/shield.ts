export function phoneShield(value: string) {
  return value.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}
export function idShield(value: string) {
  return value.replace('(d{4})d{10}(w{4})', '$1*****$2')
}
export function emailShield(value: string) {
  return value.replace(/(\w?)(\w+)(\w)(@\w+\.[a-z]+(\.[a-z]+)?)/, '$1****$3$4')
}

export const shield = {
  phoneShield, emailShield, idShield,
}
