import type { DH_STATES } from './stores/files'
import { type RcloneRunParams, RcloneServiceEvent, type ScheduleAddParams, type ScheduleDeleteParams, ScheduleServiceEvent, type ServiceResult, type WindowDownloadParams, type WindowOpenParams, WindowServiceEvent } from '~/electron/event'

export default function useElectron() {
  const isServer = import.meta.server || typeof window === 'undefined' || typeof window.require === 'undefined'
  const isElectron = !isServer && navigator.userAgent.toLowerCase().includes('electron')
  if (!isElectron || isServer)
    return { isElectron }

  // Initialize electron
  const electron = window.require('electron')

  // Window title bar actions
  // ========================
  const actions = {
    min: () => electron.ipcRenderer.invoke(WindowServiceEvent.Min),
    max: () => electron.ipcRenderer.invoke(WindowServiceEvent.Max),
    isMax: () => electron.ipcRenderer.invoke(WindowServiceEvent.IsMax),
    close: () => electron.ipcRenderer.invoke(WindowServiceEvent.Close),
    openFile: (params: WindowOpenParams) => electron.ipcRenderer.invoke(WindowServiceEvent.OpenFile, params),
    chooseDir: (): Promise<ServiceResult<string[]>> => electron.ipcRenderer.invoke(WindowServiceEvent.ChooseDir),
    getDrives: (): Promise<ServiceResult<{
      used: string[]
      unused: string[]
    }>> => electron.ipcRenderer.invoke(WindowServiceEvent.GetDrives),
    download: {
      start: (params: WindowDownloadParams) => electron.ipcRenderer.invoke(WindowServiceEvent.Download, params),
      pause: (url: string) => electron.ipcRenderer.invoke(WindowServiceEvent.DownloadPause, url),
      resume: (url: string) => electron.ipcRenderer.invoke(WindowServiceEvent.DownloadResume, url),
      cancel: (url: string) => electron.ipcRenderer.invoke(WindowServiceEvent.DownloadCancel, url),
    },
  }

  const rclone = {
    run: (params: RcloneRunParams): Promise<ServiceResult<{
      addr: string
      token: string
    }>> => electron.ipcRenderer.invoke(RcloneServiceEvent.Run, params),
  }

  const schedule = {
    add: (params: ScheduleAddParams) => electron.ipcRenderer.invoke(ScheduleServiceEvent.ScheduleAdd, params),
    remove: (params: ScheduleDeleteParams) => electron.ipcRenderer.invoke(ScheduleServiceEvent.ScheduleDelete, params),
    list: (): Promise<ServiceResult<Task[]>> => electron.ipcRenderer.invoke(ScheduleServiceEvent.ScheduleList),
  }

  // Window title bar stats
  // ======================
  const windowStats = ref({
    isMaximized: false,
    isMinimized: false,
    isFullscreen: false,
  })

  const files = useFileStore()

  electron.ipcRenderer.on(WindowServiceEvent.Max_Changed, (_event, value) => {
    windowStats.value.isMaximized = value
  })

  electron.ipcRenderer.on(WindowServiceEvent.Min_Changed, (_event, value) => {
    windowStats.value.isMinimized = value
  })

  electron.ipcRenderer.on(WindowServiceEvent.FullScreen_Changed, (_event, value) => {
    windowStats.value.isFullscreen = value
  })

  electron.ipcRenderer.on(WindowServiceEvent.DownloadProgress_Changed, (_event, value: ServiceResult< {
    url: string
    progress: {
      progress: number
    }
  }>) => {
    files.updateDownloadPercent(value.data!.url, value.data!.progress.progress)
  })

  electron.ipcRenderer.on(WindowServiceEvent.DownloadStatus_Changed, (_event, value: ServiceResult<{
    url: string
    state: DH_STATES
  }>) => {
    console.log(value)
    files.updateDowwloadStatus(value.data!.url, value.data!.state)
  })

  // Initialize ipcRenderer
  return { isElectron, actions, rclone, schedule, windowStats }
}
