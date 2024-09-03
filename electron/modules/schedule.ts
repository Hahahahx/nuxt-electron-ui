import Store from 'electron-store'

import type { ScheduleAddParams, ScheduleDeleteParams } from '../event'
import { ScheduleServiceEvent } from '../event'
import { ModuleFactory } from '../utils/module'
import { execCrypt } from '../utils/exe'
import { rcloneExe } from './rclone'

const schedule = require('node-schedule')

const store: any = new Store()

export class ScheduleModule extends ModuleFactory {
  rule: any
  tasks: Map<string, any>

  constructor() {
    super()
    this.tasks = new Map()
    // 定义规则
    const rule = new schedule.RecurrenceRule()
    // 每小时30分时执行
    rule.minute = 30
    rule.second = 0
  }

  Register() {
    // 初始化任务
    Array.from<ScheduleAddParams>(store.get(`schedule`, [])).forEach((item: ScheduleAddParams) => {
      const job = schedule.scheduleJob(this.rule, () => {
        console.log('执行任务')
        execCrypt(rcloneExe, ['sync', `${item.fromFs}:${item.fromRemote}`, `${item.toFs}:${item.toRemote}`])
      })

      this.tasks.set(item.name, job)
    })

    // 获取任务列表
    this.RegisterHandler(ScheduleServiceEvent.ScheduleList, async () => {
      return Array.from(store.get(`schedule`, []))
    })

    // 添加任务
    this.RegisterHandler<ScheduleAddParams>(ScheduleServiceEvent.ScheduleAdd, async ({ params }) => {
      const job = schedule.scheduleJob(this.rule, () => {
        console.log('执行任务')
        execCrypt(rcloneExe, ['sync', `${params.fromFs}:${params.fromRemote}`, `${params.toFs}:${params.toRemote}`])
      })

      this.tasks.set(params.name, job)
      store.set(`schedule.${params.name}`, params)
    })

    // 删除任务
    this.RegisterHandler<ScheduleDeleteParams>(ScheduleServiceEvent.ScheduleDelete, async ({ params }) => {
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
