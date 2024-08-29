export const imageExtensions = [
  'jpeg',
  'jpg',
  'gif',
  'svg',
  'png',
  'bmp',
  'tiff',
  'ico',
]

export function isImage(fileName: string) {
  const fileNameSplit = fileName.split('.')
  const ext = fileNameSplit[fileNameSplit.length - 1]

  return imageExtensions.includes(ext)
}
