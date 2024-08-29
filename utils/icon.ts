import iconsSchema from './icons'

export function getFileIcon(fileName: string) {
  const nameSplit = fileName.split('.')
  const ext = nameSplit[nameSplit.length - 1]

  const iconKey
    = iconsSchema.fileNames[fileName as keyof typeof iconsSchema.fileNames]
    || iconsSchema.fileExtensions[ext as keyof typeof iconsSchema.fileExtensions]

  const icon
    = iconsSchema.iconDefinitions[
      iconKey as keyof typeof iconsSchema.iconDefinitions
    ] || iconsSchema.iconDefinitions._file

  return icon
}
