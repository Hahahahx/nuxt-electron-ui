import type { RcloneServiceEvent } from './rclone'
import type { WindowServiceEvent } from './window'

export * from './window'
export * from './rclone'

export type ServiceEvent = WindowServiceEvent | RcloneServiceEvent

export interface ServiceResult<T> {
  result: boolean
  msg?: string
  data?: T
  winId?: string | number
}
