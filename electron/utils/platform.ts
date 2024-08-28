import * as os from 'node:os'
import { BrowserWindow, BrowserWindow as ElectronBrowserWindow } from 'electron'
// env
export const isDev = process.env.NODE_ENV === 'development'
export const isProd = !isDev

// platform
export const platform = process.platform.toLocaleLowerCase()
export const isMac = platform === 'darwin'
export const isWindows = platform === 'win32'
export const isLinux = platform === 'linux'
export const isAix = platform === 'aix'
export const isFreebsd = platform === 'freebsd'
export const isOpenbsd = platform === 'openbsd'
export const isSunos = platform === 'sunos'

// architucture
export const architucture = os.arch()
export const isArchitectureX64 = architucture === 'x64'
export const isArchitectureIa32 = architucture === 'ia32'
export const isArchitectureArm64 = architucture === 'arm64'
export const isArchitectureArm = architucture === 'arm'

// electron
export function getWindow(id: number): ElectronBrowserWindow | undefined {
  return ElectronBrowserWindow.getAllWindows().find((window) => {
    return window.id === id
  })
}

export function getWindowFromEvent(event: Electron.IpcMainInvokeEvent) {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  return win
}
