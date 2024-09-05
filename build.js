const builder = require('electron-builder')

const Platform = builder.Platform

/**
 * @type {import('electron-builder').Configuration}
 */
const options = {
  appId: 'com.app.id',
  asar: true,
  productName: 'OSCA联盟云存储',
  // protocols: {
  // name: 'Your deeplink',
  // - Don't forget to set `MimeType: "x-scheme-handler/deeplink"` for `linux.desktop` entry!
  // schemes: ['deeplink']
  // },
  // - Electron auto-updater config
  // publish: [
  //   {
  //     provider: 'github',
  //     owner: 'eternalc0der',
  //     repo: 'electron-nuxt3',
  //     releaseType: 'release'
  //   }
  // ],

  // "store" | "normal" | "maximum" - For testing builds, use 'store' to reduce build time significantly.
  compression: 'maximum',
  removePackageScripts: true,

  nodeGypRebuild: false,
  buildDependenciesFromSource: false,

  extraResources: [{
    from: './electron/assets/rclone.exe',
  }],
  directories: {
    // eslint-disable-next-line no-template-curly-in-string
    output: 'electron-dist/${version}',
  },
  win: {
    // eslint-disable-next-line no-template-curly-in-string
    artifactName: '${productName}-Setup-${version}.${ext}',
    target: [
      {
        target: 'nsis',
        arch: ['x64'],
      },
    ],
  },
  nsis: { // 是否一键安装，建议为 false，可以让用户点击下一步、下一步、下一步的形式安装程序
    // 如果为true，当用户双击构建好的程序，自动安装程序并打开，即：一键安装（one-click installer）
    oneClick: false,
    // 为所有人安装，false的话可以选择为当前用户安装
    perMachine: true,
    // .nsh文件会在程序安装过程执行
    // "include": "./build/nsis/installer.nsh",
    // packElevateHelper: true,
    // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
    allowElevation: true,
    // 允许修改安装目录，建议为 true，是否允许用户改变安装目录，默认是不允许
    allowToChangeInstallationDirectory: true,
    deleteAppDataOnUninstall: true,
  },
  mac: {
    category: 'public.app-category.entertainment',
    hardenedRuntime: false,
    gatekeeperAssess: false,
    target: [
      {
        target: 'default',
        arch: ['x64', 'arm64'],
      },
    ],
  },
  linux: {
    maintainer: 'Your Name',
    desktop: {
      StartupNotify: 'false',
      Encoding: 'UTF-8',
      MimeType: 'x-scheme-handler/deeplink',
    },
    target: ['AppImage', 'rpm', 'deb'],
  },
}

const platform = 'WINDOWS' // "MAC" | "LINUX" | "WINDOWS" - Change this to build for other platforms
builder
  .build({
    targets: Platform[platform].createTarget(),
    config: options,
  })
  .then((result) => {
    console.log('----------------------------')
    console.log('Platform:', platform)
    console.log('Output:', JSON.stringify(result, null, 2))
  })
