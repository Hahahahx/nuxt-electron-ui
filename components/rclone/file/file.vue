<script setup lang="ts">
const props = defineProps<{
  file: Files.Item
}>()

const alert = useAlert()
const rclone = useRcloneStore()
const path = useCurrentPath()
const files = useFileStore()
const electron = useElectron()

const downloadUrl = computed(() => {
  const url = Api.operations.download({
    url: (`/[${encodeURI(path.value.fs)}]/${encodeURI([...path.value.prefixs, props.file.Name].join('/'))}`),
  })
  return url
})

const downloadFile = computed(() => {
  return files.downloads.find(item => item.url === downloadUrl.value)
})

effect(() => {
  console.log(downloadFile.value)
})

function download() {
  alert.info('正在下载中，请稍后打开')
  files.downloadFile(downloadUrl.value, props.file)
}

const isDir = computed(() => !!props.file.IsDir)
const isLocal = computed(() => rclone.currentConfig?.config.type === 'local' || downloadFile.value?.status === DH_STATES.FINISHED)

const name = computed(() => {
  return props.file.Name
})

function fileOpen() {
  if (isDir.value) {
    navigateTo(`/file/${path.value.fsBase}/${props.file.Path}`)
  }
  else if (!isLocal.value) {
    download()
  }
  else {
    if (rclone.currentConfig?.config.type === 'local') {
      electron.actions?.openFile({
        paths: [rclone.currentConfig?.config.root_folder_path ?? '', props.file.Path], // downloadFile.value.realPath,
      })
    }
    else {
      electron.actions?.openFile({
        paths: [downloadFile.value?.path ?? '', props.file.Name],
      })
    }
  }
}

const onDelete = alert.catch(async () => {
  await Api.operations.delete({
    fs: path.value.fs,
    remote: path.value.prefix,
  })
})

const menu = computed(() => {
  return [[
    {
      label: props.file.Name,
      disabled: true,
      labelClass: 'max-w-[160px] p-2 bg-gray-500/20 rounded w-full min-w-[100px] text-center',
    },
    isLocal.value && {
      label: '打开',
      icon: 'ph:arrow-square-in-duotone',
      click: fileOpen,
    },
  // {
  //   label: '复制路径',
  //   icon: 'ph:copy-duotone',
  //   click: () => {
  //     console.log('copy path')
  //   },
  // },
  // {
  //   label: '属性',
  //   icon: 'ph:shield-warning-duotone',
  //   click: () => {
  //     console.log('property')
  //   },
  // },
  ].filter(i => !!i), [
    !isDir.value && !isLocal.value && {
      label: '下载',
      icon: 'ph:download-simple-duotone',
      click: () => download(),
    },
    // {
    //   label: '重命名',
    //   icon: 'ph:textbox-duotone',
    //   click: () => {
    //     console.log('rename')
    //   },
    // },
    // {
    //   label: '复制',
    //   icon: 'ph:copy-simple-duotone',
    //   click: () => {
    //     console.log('copy')
    //   },
    // },
    // {
    //   label: '移动',
    //   icon: 'ph:arrow-bend-double-up-left-duotone',
    //   click: () => {
    //     console.log('move')
    //   },
    // },
    // {
    //   label: '分享',
    //   icon: 'ph:share-network-duotone',
    //   click: () => {
    //     console.log('share')
    //   },
    // },
    {
      label: '删除',
      icon: 'ph:trash-duotone',
      click: onDelete,
    },
  ].filter(i => !!i)]
})

function onDoubleClick() {
  fileOpen()
}
</script>

<template>
  <ContextMenu :menu="menu as any">
    <UPopover mode="hover" :popper="{ placement: 'bottom' }">
      <div
        class="flex flex-col items-center transition-all duration-200 cursor-pointer hover:opacity-60 group"
        @dblclick="onDoubleClick"
      >
        <div class="relative w-16 h-fit">
          <div class="absolute flex text-xs bottom-0 right-0 z-10 ">
            <!-- <div v-if="downloadFile && downloadFile.status === 'updated'" class=" bg-orange-500 rounded px-1">
                改
              </div> -->
            <div v-if="downloadFile && downloadFile.status === DH_STATES.FINISHED" class=" bg-blue-500 rounded px-1">
              缓
            </div>
            <UProgress v-if="downloadFile && downloadFile.status === DH_STATES.DOWNLOADING" :value="downloadFile.percent" class="w-[40px] h-[8px] border border-gray-500/15 bg-black/40" />
          </div>
          <img v-if="isDir" src="/images/system/folder.svg">
          <BaseFile v-else :filename="name" class="size-16" />
        </div>

        <div class="w-full mt-3">
          <p class="p-1 font-medium text-center truncate text-app-text2 w-[90px] ">
            {{ name }}
          </p>
        </div>
      </div>

      <template #panel>
        <div class="flex flex-col justify-center items-center p-2">
          <p class="">
            {{ name }}
          </p>
          <div v-if="!isDir" class="w-full space-y-1">
            <UDivider class="my-1 w-full bg-gray-500/25" />
            <p class=" typography-muted text-xs">
              文件大小 : {{ byteTrans.mertic(file?.Size) }}
            </p>
            <p class=" typography-muted  text-xs">
              {{ format.dateTimeS(file?.ModTime) }}
            </p>
            <div v-if="downloadFile && downloadFile.status === DH_STATES.FINISHED" class="  typography-muted !text-blue-500 text-xs">
              文件已下载
            </div>
            <!-- <div v-else-if="downloadFile && downloadFile.status === 'updated'" class=" !text-orange-500 typography-muted  text-xs">
                文件已变更
              </div> -->
            <div v-else-if="downloadFile && downloadFile.status === DH_STATES.DOWNLOADING" class="bg-black/15 rounded p-2 my-1">
              <Flex justify-content="center" align-items="center" class="gap-2">
                <Flex direction="col" class="flex-1">
                  <p class=" typography-muted mb-1 text-xs">
                    下载进度 : {{ downloadFile.percent }}%
                  </p>
                  <UProgress :value="downloadFile.percent" class=" h-[5px] bg-black/40" />
                </Flex>
                <!-- <Button size="xs">
                      取消
                    </Button> -->
              </Flex>
            </div>
            <div v-else class=" typography-muted  text-xs">
              {{ isLocal ? '本地文件' : '远程文件' }}
            </div>
          </div>
        </div>
      </template>
    </UPopover>
  </ContextMenu>
</template>
