declare namespace Config {
  interface Dump {
    [key: string]: Config.S3 | Config.Local
  }

  interface List {
    remotes: string[]
  }

  interface Delete {

    name: string

  }

  interface Add {
    name: string
    type: string
    config: Config.Item
  }

  type Item = Config.S3 | Config.Local

  interface Local {
  // TODO: Add fields
    type: string
    root_folder_path: string // '/'
    thumbnail: boolean // false
    thumb_cache_folder: string // ''
    show_hidden: boolean // true
    mkdir_perm: string // '777'
    recycle_bin_path: string // 'delete permanently'
  }

  interface S3 {
    access_key_id: string
    add_filename_to_disposition: string
    bucket: string
    custom_host: ''
    endpoint: string
    force_path_style: string
    list_object_version: string
    placeholder: ''
    provider: string
    region: ''
    remove_bucket: string
    root_folder_path: string
    secret_access_key: string
    session_token: ''
    sign_url_expire: string
    type: string
  }

}
