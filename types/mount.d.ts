declare namespace Mount {
  interface List {
    mountPoints: Item[]
  }

  interface Item {
    Fs: string
    MountedOn: string
    MountPoint: string
  }

  interface Add {
    fs: string
    mountOpt: { [key: string]: any }
    mountPoint: string
    mountType: string
    vfsOpt: { [key: string]: any }
  }

  interface Delete {
    mountPoint: string
  }

}
