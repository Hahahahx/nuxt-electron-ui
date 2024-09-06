import path from 'node:path'
import { dialog, shell } from 'electron'
import { DownloaderHelper } from 'node-downloader-helper'
import type { WindowDownloadParams, WindowOpenParams } from '../event'
import { WindowServiceEvent } from '../event'
import { ModuleFactory } from '../utils/module'
import { getLocalDriveList } from '../utils/exe'
import { RcloneToken } from './rclone'

const downloadTask = new Map<string, {
  task: DownloaderHelper
  realPath: string
}>()

export class WindowModule extends ModuleFactory {
  Register() {
    this.mainWindow.on('maximize', () => this.mainWindow.webContents.send(WindowServiceEvent.Max_Changed, true))
    this.mainWindow.on('unmaximize', () => this.mainWindow.webContents.send(WindowServiceEvent.Max_Changed, false))
    this.mainWindow.on('minimize', () => this.mainWindow.webContents.send(WindowServiceEvent.Min_Changed, true))
    this.mainWindow.on('restore', () => this.mainWindow.webContents.send(WindowServiceEvent.Min_Changed, false))
    this.mainWindow.on('enter-full-screen', () => this.mainWindow.webContents.send(WindowServiceEvent.FullScreen_Changed, true))
    this.mainWindow.on('leave-full-screen', () => this.mainWindow.webContents.send(WindowServiceEvent.FullScreen_Changed, false))

    // 下载
    this.RegisterHandler<WindowDownloadParams>(WindowServiceEvent.Download, async ({ params }) => {
      const dl = new DownloaderHelper(params.url, params.path, {
        fileName: params.filename,
        headers: {
          Authorization: RcloneToken,
        },
      })

      console.log('Download Started : ', RcloneToken)

      downloadTask.set(params.url, {
        task: dl,
        realPath: path.join(params.path, params.filename),
      })

      dl.on('end', () => {
        downloadTask.delete(params.url)
      })
      dl.on('error', err => console.log('Download Failed', err))
      dl.on('progress', (progress) => {
        this.BroadcastToAll(WindowServiceEvent.DownloadProgress_Changed, { url: params.url, progress })
      })

      dl.on('stateChanged', (state) => {
        this.BroadcastToAll(WindowServiceEvent.DownloadStatus_Changed, { url: params.url, state })
      })

      dl.start().catch(err => console.log(err))
    })

    // 暂停下载
    this.RegisterHandler<{
      url: string
    }>(WindowServiceEvent.DownloadPause, async (event) => {
      const task = downloadTask.get(event.params.url)
      if (task) {
        task.task.pause()
      }
    })

    // 继续下载
    this.RegisterHandler<{
      url: string
    }>(WindowServiceEvent.DownloadResume, async ({ params }) => {
      const task = downloadTask.get(params.url)
      if (task) {
        task.task.resume()
        task.task.on('progress', (progress) => {
          this.BroadcastToAll(WindowServiceEvent.DownloadProgress_Changed, { url: params.url, progress })
        })

        task.task.on('stateChanged', (state) => {
          this.BroadcastToAll(WindowServiceEvent.DownloadStatus_Changed, { url: params.url, state })
        })
      }
    })

    // 取消下载
    this.RegisterHandler<{
      url: string
    }>(WindowServiceEvent.DownloadCancel, async (event) => {
      const task = downloadTask.get(event.params.url)
      if (task) {
        task.task.stop()
        downloadTask.delete(event.params.url)
      }
    })

    // 是否是最大化
    this.RegisterHandler(WindowServiceEvent.IsMax, async (event) => {
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

    // 选择文件夹
    this.RegisterHandler(WindowServiceEvent.ChooseDir, async () => {
      return await new Promise((resolve, reject) => {
        dialog.showOpenDialog({
          properties: ['openDirectory'],
        }).then((result) => {
          if (!result.canceled)
            resolve(result.filePaths)
          else
            reject(new Error('取消选择'))
        }).catch((e) => {
          reject(e)
        })
      })
    })

    // 获取本地盘符和可使用盘符列表
    this.RegisterHandler(WindowServiceEvent.GetDrives, async () => {
      const used = getLocalDriveList()

      const unused = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'].map(i => i.toLocaleUpperCase()).filter(drive => !used.includes(drive))

      return {
        unused,
        used,
      }
    })
  }
}

export default new WindowModule()
