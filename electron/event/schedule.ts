export enum ScheduleServiceEvent {
  ScheduleAdd = 'schedule-add',
  ScheduleDelete = 'schedule-delete',
  ScheduleList = 'schedule-list',
}

export interface ScheduleAddParams {
  name: string
  fromFs: string
  fromRemote: string
  toFs: string
  toRemote: string
}

export interface ScheduleDeleteParams {
  name: string
}
