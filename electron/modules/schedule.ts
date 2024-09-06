// import Store from 'electron-store'
import schedule from 'node-schedule'

import type { ScheduleAddParams, ScheduleDeleteParams } from '../event'
import { ScheduleServiceEvent } from '../event'
import { ModuleFactory } from '../utils/module'
import { execCrypt } from '../utils/exe'
import { rcloneExe } from './rclone'

const Store = require('electron-store')
// const schedule = require('node-schedule')

const store: any = new Store()

export class ScheduleModule extends ModuleFactory {
  rule: any = new schedule.RecurrenceRule()
  tasks: Map<string, any>

  constructor() {
    super()
    this.tasks = new Map()
    // 每小时30分时执行
    this.rule.minute = 30
    this.rule.second = 0
  }

  Register() {
    // 初始化任务
    setTimeout(() => {
      Object.values<ScheduleAddParams>(store.get(`schedule`) ?? {}).forEach((item: ScheduleAddParams) => {
        console.log('初始化任务:', item.name)

        const job = schedule.scheduleJob(this.rule, () => {
          console.log('执行任务:', item.name)
          execCrypt(rcloneExe, ['sync', `${item.fromFs}:${item.fromRemote}`, `${item.toFs}:${item.toRemote}`, '--files-only', 'false'])
        })

        this.tasks.set(item.name, job)
      })
    })

    // 获取任务列表
    this.RegisterHandler(ScheduleServiceEvent.ScheduleList, async () => {
      return Object.values<ScheduleAddParams>(store.get(`schedule`))
    })

    // 添加任务
    this.RegisterHandler<ScheduleAddParams>(ScheduleServiceEvent.ScheduleAdd, async ({ params }) => {
      console.log('添加任务:', params.name)
      const job = schedule.scheduleJob(this.rule, () => {
        console.log('执行任务:', params.name)
        execCrypt(rcloneExe, ['sync', `${params.fromFs}:${params.fromRemote}`, `${params.toFs}:${params.toRemote}`])
      })

      this.tasks.set(params.name, job)
      store.set(`schedule.${params.name}`, params)
    })

    // 删除任务
    this.RegisterHandler<ScheduleDeleteParams>(ScheduleServiceEvent.ScheduleDelete, async ({ params }) => {
      console.log('删除任务:', params.name)

      const job = this.tasks.get(params.name)
      if (job) {
        job.cancel()
        this.tasks.delete(params.name)
        store.delete(`schedule.${params.name}`)
      }
    })
  }
}

export default new ScheduleModule()
