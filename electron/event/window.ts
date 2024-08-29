export enum WindowServiceEvent {
  Min = 'window-min',
  Max = 'window-max',
  Close = 'window-close',
  IsMax = 'window-is-maximized',
  Max_Changed = 'window-max-changed',
  Min_Changed = 'window-min-changed',
  FullScreen_Changed = 'window-full-screen-changed',
  Restored = 'window-restored',

  OpenFile = 'window-open-file',
  DownloadInit = 'window-download-init',
  DownloadProgress = 'window-download-progress',
  Download = 'window-download',
  DownloadPause = 'window-download-pause',
  DownloadResume = 'window-download-resume',
  DownloadCancel = 'window-download-cancel',
}

export interface WindowOpenParams {
  paths: string[]
}
