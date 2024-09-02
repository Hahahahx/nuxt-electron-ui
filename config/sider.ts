export const sider = [
  {
    group: '存储资源',
    list: [
    //   {
    //   label: '存储概览',
    //   icon: 'solar:chart-2-bold-duotone',
    //   to: '/dashboard',
    // },
      {
        label: '存储配置',
        icon: 'i-solar-database-bold-duotone',
        to: '/config',
      },
    ],
  },
  {
    group: '文件列表',
    list: [
      {
        id: 'file',
        key: 'file',
        label: '存储文件',
        icon: 'i-solar-archive-bold-duotone',
        to: '/file',
        shortcuts: ['G', 'D'],
      },
      // {
      //   id: 'share',
      //   key: 'share',
      //   label: '共享文件',
      //   icon: 'i-solar-clouds-bold-duotone',
      //   to: '/share',
      //   shortcuts: ['G', 'S'],
      // },
      // {
      //   to: '/collect',
      //   icon: 'solar:box-minimalistic-bold-duotone',
      //   label: '收藏文件',
      // },
      {
        to: '/upload',
        icon: 'i-solar-archive-up-bold-duotone',
        label: '上传列表',
      },
      {
        to: '/download',
        icon: 'i-solar-archive-down-bold-duotone',
        label: '下载列表',
      },
    ],
  },
  {
    group: '系统配置',
    list: [{
      to: '/mount',
      icon: 'i-solar-display-bold-duotone',
      label: '挂载列表',
    }],
  },
]

export type Sider = typeof sider
