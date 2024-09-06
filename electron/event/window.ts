export enum WindowServiceEvent {
  Min = 'window-min',
  Max = 'window-max',
  Close = 'window-close',
  IsMax = 'window-is-maximized',
  Max_Changed = 'window-max-changed',
  Min_Changed = 'window-min-changed',
  FullScreen_Changed = 'window-full-screen-changed',
  Restored = 'window-restored',

  GetDrives = 'window-get-drives',
  OpenFile = 'window-open-file',
  ChooseDir = 'window-choose-dir',
  DownloadInit = 'window-download-init',
  DownloadProgress_Changed = 'window-download-progress-changed',
  DownloadStatus_Changed = 'window-download-status-changed',
  Download = 'window-download',
  DownloadPause = 'window-download-pause',
  DownloadResume = 'window-download-resume',
  DownloadCancel = 'window-download-cancel',
}

export interface WindowOpenParams {
  paths: string[]
}

export interface WindowDownloadParams {
  url: string
  path: string
  filename: string
}
