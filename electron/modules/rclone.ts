import { join } from 'node:path'
import type { RcloneRunParams } from '../event'
import { RcloneServiceEvent } from '../event'
import { ModuleFactory } from '../utils/module'
import { verifyPortAsync } from '../utils/port'
import { execCrypt } from '../utils/exe'
import { isDev } from '../utils/platform'

export const rcloneExe = isDev
  ? join(__dirname, '..', 'assets', 'rclone.exe')
  : join(process.cwd(), 'resources', 'rclone.exe')

export let RcloneToken = ''

export class RcloneModule extends ModuleFactory {
  Register() {
    // 打开rclone配置文件
    this.RegisterHandler<RcloneRunParams>(RcloneServiceEvent.Run, async ({ params }) => {
      const port = await verifyPortAsync(5572)
      const addr = `:${port}`
      const token = `Basic ${btoa(`${params.username}:${params.password}`)}`
      await execCrypt(rcloneExe, ['rcd', '--rc-web-gui', '--rc-web-gui-no-open-browser', '--rc-addr', addr, '--rc-user', params.username, '--rc-pass', params.password, '--rc-allow-origin', '*'])

      RcloneToken = token
      console.log(`rclone is running at http://127.0.0.1${addr}, token is ${token}`)

      return {
        addr: `http://127.0.0.1${addr}`,
        token,
      }
    })
  }
}

export default new RcloneModule()
