import { WindowServiceEvent } from '~/electron/event'

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
  }

  // Window title bar stats
  // ======================
  const windowStats = ref({
    isMaximized: false,
    isMinimized: false,
    isFullscreen: false,
  })

  electron.ipcRenderer.on(WindowServiceEvent.Max_Changed, (_event, value) => {
    windowStats.value.isMaximized = value
  })
  electron.ipcRenderer.on(WindowServiceEvent.Min_Changed, (_event, value) => {
    windowStats.value.isMinimized = value
  })
  electron.ipcRenderer.on(WindowServiceEvent.FullScreen_Changed, (_event, value) => {
    windowStats.value.isFullscreen = value
  })

  // Initialize ipcRenderer
  return { isElectron, actions, windowStats }
}
