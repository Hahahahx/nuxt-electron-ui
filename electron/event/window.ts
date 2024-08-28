export enum WindowServiceEvent {
  Min = 'window-min',
  Max = 'window-max',
  Close = 'window-close',

  isMax = 'window-is-maximized',

  Maximized = 'window-maximized',
  UnMaximized = 'window-un-maximized',
  Minimized = 'window-minimized',
  Restored = 'window-restored',

  EnterFullScreen = 'window-enter-full-screen',
  LeaveFullScreen = 'window-leave-full-screen',

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
