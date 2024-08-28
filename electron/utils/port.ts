import net from 'node:net'

export const verifyPort = async function (port: number, portAvailableCallback: (port: number) => void) {
  function portUsed(port: number) {
    return new Promise((resolve) => {
      const server = net.createServer().listen(port)
      server.on('listening', () => {
        server.close()
        resolve(port)
      })
      server.on('error', (err: any) => {
        if (err.code === 'EADDRINUSE') {
          resolve(err)
        }
      })
    })
  }

  const res = await portUsed(port)
  if (res instanceof Error) {
    console.log(`端口：${port}被占用\n`)
    port++
    verifyPort(port, portAvailableCallback)
  }
  else {
    portAvailableCallback(port)
  }
}

export const verifyPortAsync = async function (port: number): Promise<number> {
  return new Promise((resolve) => {
    verifyPort(port, (p) => {
      resolve(p)
    })
  })
}
