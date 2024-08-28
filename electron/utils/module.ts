import { type BrowserWindow, webContents } from 'electron'
import type { ServiceEvent } from '../event'
import type { Handler } from './request'
import { RequestHandler, result } from './request'

export class Module {
  Init(mainWindow: BrowserWindow, modules: ModuleFactory[]) {
    modules.forEach((module) => {
      module.Init(mainWindow)
      module.Register()
    })
  }
}

interface ModuleFactoryBase {
  Init: (mainWindow: BrowserWindow) => void
  Register: () => void
}

export class ModuleFactory implements ModuleFactoryBase {
  mainWindow!: BrowserWindow

  Init(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow
  }

  protected BroadcastToMain<T>(type: ServiceEvent, data?: T) {
    this.mainWindow.webContents.send(type, result.Success(this.mainWindow.id, data))
  }

  protected BroadcastToAll<T>(type: ServiceEvent, data?: T) {
    webContents.getAllWebContents().forEach((win) => {
      win.send(type, result.Success(win.id, data))
    })
  }

  protected RegisterHandler<T>(type: ServiceEvent, handle: Handler<T, any>) {
    console.log(`RegisterHandler: ${type}`)
    RequestHandler(type, handle)
  }

  Register() {}
}
