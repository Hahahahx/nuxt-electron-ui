import { execFile } from 'node:child_process'

export function execCrypt(exe: string, command: string[]): Promise<any> {
  return new Promise((res, rej) => {
    console.log('运行：', exe, command)

    try {
      const result = execFile(exe, [...command], (err: any, stdout: any, stderr: any) => {
        console.log('stdout:', stdout)
        console.log('stderr:', stderr)
        console.log('err:', err)
        // if (err) {
        //   rej(stderr)
        // }
        // if (stdout) {
        //   const result = JSON.parse(stdout)
        //   if (result.result) {
        //     res(result)
        //   }
        //   else {
        //     rej(stdout)
        //   }
        // }
      })

      res(result.pid) // 返回进程id
    }
    catch (error) {
      rej(error)
    }
  })
}
