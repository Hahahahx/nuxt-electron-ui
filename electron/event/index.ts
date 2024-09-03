import type { RcloneServiceEvent } from './rclone'
import type { ScheduleServiceEvent } from './schedule'
import type { WindowServiceEvent } from './window'

export * from './window'
export * from './rclone'
export * from './schedule'

export type ServiceEvent = WindowServiceEvent | RcloneServiceEvent | ScheduleServiceEvent

export interface ServiceResult<T> {
  result: boolean
  msg?: string
  data?: T
  winId?: string | number
}
