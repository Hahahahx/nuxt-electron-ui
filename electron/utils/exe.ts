import { execFile, execSync } from 'node:child_process'

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

export function getLocalDriveList() { // 返回所有盘符，同步
  let arr: string[] = []
  let str = execSync('wmic logicaldisk get caption').toString()// 将返回的变量改为字符串类型
  str = str.replace('Caption', '')// 修改字符串
  str = str.replace(/\s/g, '')
  str = str.replace(/\n/g, '')
  str = str.slice(0, -1)
  console.log(str.split(':'), str)
  arr = str.split(':')// 将字符串变为数组
  return arr
}
