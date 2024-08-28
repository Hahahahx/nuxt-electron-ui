import path from 'node:path'
import { shell } from 'electron'
import type { WindowOpenParams } from '../event'
import { WindowServiceEvent } from '../event'
import { ModuleFactory } from '../utils/module'

export class WindowModule extends ModuleFactory {
  Register() {
    this.mainWindow.on('maximize', () => this.mainWindow.webContents.send(WindowServiceEvent.Maximized, true))
    this.mainWindow.on('unmaximize', () => this.mainWindow.webContents.send(WindowServiceEvent.UnMaximized, false))
    this.mainWindow.on('minimize', () => this.mainWindow.webContents.send(WindowServiceEvent.Minimized, true))
    this.mainWindow.on('enter-full-screen', () => this.mainWindow.webContents.send(WindowServiceEvent.EnterFullScreen, true))
    this.mainWindow.on('leave-full-screen', () => this.mainWindow.webContents.send(WindowServiceEvent.LeaveFullScreen, false))

    // 是否是最大化
    this.RegisterHandler(WindowServiceEvent.isMax, async (event) => {
      return event.eventWindow.isMaximized()
    })

    // 最大化操作
    this.RegisterHandler(WindowServiceEvent.Max, async (event) => {
      if (event.eventWindow.isMaximized()) {
        event.eventWindow.unmaximize()
      }
      else {
        event.eventWindow.maximize()
      }
      return event.eventWindow.isMaximized()
    })

    // 最小化操作
    this.RegisterHandler(WindowServiceEvent.Min, async (event) => {
      event.eventWindow.minimize()
    })

    // 关闭操作
    this.RegisterHandler(WindowServiceEvent.Close, async (event) => {
      event.eventWindow.close()
    })

    // 恢复操作
    this.RegisterHandler(WindowServiceEvent.Restored, async (event) => {
      event.eventWindow.restore()
      return event.eventWindow.isMinimized()
    })

    // 打开文件
    this.RegisterHandler<WindowOpenParams>(WindowServiceEvent.OpenFile, async ({ params }) => {
      const url = path.join(...params.paths)
      shell.openExternal(url)
    })
  }
}

export default new WindowModule()
