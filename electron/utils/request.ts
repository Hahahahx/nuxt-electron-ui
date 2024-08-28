import type { BrowserWindow } from 'electron'
import { ipcMain } from 'electron'
import type { ServiceEvent, ServiceResult } from '../event'
import { getWindowFromEvent } from './platform'

export const result = {
  Success<T>(winId: string | number, data?: T): ServiceResult<T> {
    return {
      result: true,
      data,
      winId,
    }
  },
  Error<T>(msg?: string, winId?: string | number, data?: T): ServiceResult<T> {
    return {
      result: false,
      msg,
      data,
      winId,
    }
  },
}

export type Handler<Params, Return> = (event: {
  original: Electron.IpcMainInvokeEvent
  eventWindow: BrowserWindow
  params: Params
}) => Promise<Return>

export function RequestHandler<T>(type: ServiceEvent, handle: Handler<T, any>) {
  ipcMain.handle(type, async (event, params: T) => {
    const win = getWindowFromEvent(event)
    if (!win)
      return result.Error('window not found')
    try {
      const res = await handle({
        original: event,
        eventWindow: win,
        params,
      })
      return result.Success(win.id, res)
    }
    catch (e: any) {
      console.error(e)
      return result.Error(`Eroor:${e.toString()}`, win.id)
    }
  })
}
