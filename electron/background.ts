import * as path from 'node:path'
import * as os from 'node:os'
import { BrowserWindow, app, session } from 'electron'
import singleInstance from './singleInstance'
import dynamicRenderer from './dynamicRenderer'
import updaterModule from './modules/updater'
import macMenuModule from './modules/macMenu'
import { isMac, isProd, platform } from './utils/platform'
import { Module } from './utils/module'
import WindowModule from './modules/window'
import RcloneModule from './modules/rclone'
import ScheduleModule from './modules/schedule'

// Initilize
// =========
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'
// const headerSize = 32

const moduleService = new Module()

const modules = [macMenuModule, updaterModule]

// Initialize app window
// =====================
function createWindow() {
  console.log('System info', { isProd, platform, architucture: os.arch() })
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 1024,
    minHeight: 676,
    transparent: false,
    // backgroundColor: '#000',
    webPreferences: {
      devTools: !isProd,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      contextIsolation: false,
      webSecurity: false,
      preload: path.join(__dirname, 'preload.js'),
    },
    titleBarStyle: 'hiddenInset',
    // frame: platform === 'darwin',
    frame: !isProd, // <= Remove this line if you wanted to implement your own title bar
    // titleBarOverlay: isMac && { height: headerSize },
    // title: 'electron-nuxt3',
  })

  // Lock app to single instance
  if (singleInstance(app, mainWindow))
    return

  // Open the DevTools.
  if (!isProd) {
    mainWindow.webContents.openDevTools({
      mode: 'bottom',
    })
  }

  return mainWindow
}

// App events
// ==========
app.whenReady().then(async () => {
  if (!isProd) {
    try {
      await session.defaultSession.loadExtension(path.join(__dirname, '../..', '__extensions', 'vue-devtools'))
    }
    catch (err) {
      console.log('[Electron::loadExtensions] An error occurred: ', err)
    }
  }

  const mainWindow = createWindow()
  if (!mainWindow)
    return

  // Load renderer process
  dynamicRenderer(mainWindow)
  moduleService.Init(mainWindow, [
    WindowModule,
    RcloneModule,
    ScheduleModule,
  ])

  // Initialize modules
  console.log(`${'-'.repeat(30)}\n[+] Loading modules...`)
  modules.forEach((module) => {
    try {
      module(mainWindow)
    }
    catch (err: any) {
      console.log('[!] Module error: ', err.message || err)
    }
  })

  console.log(`[!] Loading modules: Done.` + `\r\n${'-'.repeat(30)}`)

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    // if (BrowserWindow.getAllWindows().length === 0) createWindow()
    mainWindow.show()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit()
  }
})
