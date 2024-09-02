declare namespace Files {

  interface List {
    list: Item[]
  }

  interface Item {
    IsDir: boolean
    MimeType: string
    ModTime: string
    Name: string
    Path: string
    Size: number
  }

  interface Usage {
    free: number
    total: number
    used: number
  }

}
