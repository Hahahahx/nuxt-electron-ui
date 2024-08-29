export function SetItem<T>(key: string, value: string | number | T, persistent = false) {
  if (persistent)
    localStorage.setItem(key, JSON.stringify(value))

  sessionStorage.setItem(key, JSON.stringify(value))
}

export function GetItem<T>(key: string): T | null {
  const item = localStorage.getItem(key)
  if (item)
    return JSON.parse(item)

  const item2 = sessionStorage.getItem(key)
  if (item2)
    return JSON.parse(item2)

  return null
}

export function RemoveItem(key: string) {
  localStorage.removeItem(key)
  sessionStorage.removeItem(key)
}

export default {
  SetItem,
  GetItem,
  RemoveItem,
}
