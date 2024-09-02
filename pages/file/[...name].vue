<script setup lang="tsx">
import { RcloneFileCreate, RcloneFileUpload, UIcon } from '#components'

const path = useCurrentPath()

const modal = useModal()

const object = useObjectsStore()
const { data, pending, refresh } = useAsyncData(() => Api.operations.list({
  fs: `${path.value.fs}:`,
  remote: path.value.prefix,
}), {
  default: () => ({
    list: [],
  }),
})

const search = ref('')
const type = ref(0)

effect(() => {
  console.log(object.objects)
})

const list = computed(() => {
  let arr: Files.Item[] = []

  switch (type.value) {
    case 0:
      arr = data.value.list
      break
    case 1:
      arr = data.value.list.filter(i => !i.IsDir ? media.images.some(m => i.Name?.endsWith(m)) : i)
      break
    case 2:
      arr = data.value.list.filter(i => !i.IsDir ? media.video.some(m => i.Name?.endsWith(m)) : i)
      break
    case 3:
      arr = data.value.list.filter(i => !i.IsDir ? media.audio.some(m => i.Name?.endsWith(m)) : i)
      break
    case 4:
      arr = data.value.list.filter(i => !i.IsDir ? media.docs.some(m => i.Name?.endsWith(m)) : i)
      break
  }

  if (search.value) {
    return arr.filter(item => item.Name.includes(search.value))
  }
  return arr
})

const alert = useAlert()

const onCreate = alert.catch(async (value: { name: string }) => {
  await Api.operations.mkdir({
    fs: `${path.value.fs}:`,
    remote: [...path.value.prefixs, value.name].join('/'),
  })
  await refresh()
})

const file = useFileStore()

watchEffect(() => {
  if (file.files.length) {
    refresh()
  }
})

const dropZoneRef = ref<HTMLDivElement>()

const { open, onChange } = useFileDialog()
onChange(onUpload)

const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop: onUpload,
})

// 上传
async function onUpload(files: File[] | FileList | null) {
  console.log(files)
  modal.open(RcloneFileUpload, {
    files,
  })
}

function HoverZone() {
  if (isOverDropZone.value) {
    return (
      <div
        class="p-20 bg-gray-700/25 border-1 rounded h-full w-full z-[1000] absolute top-0 left-0 "
      >
        <div class="bg-gray-500/10 gap-2 h-full rounded flex border-1 justify-end items-end p-2">
          <UIcon name="solar:inbox-out-outline" class=" size-4 pb-[1px]" />
          <span class="typography-muted">
            上传文件到当前文件夹
          </span>
        </div>
      </div>
    )
  }
  return null
}

function createFloader() {
  modal.open(RcloneFileCreate, {
    onCreate,
  })
}

const menu = [[
  {
    label: '上传文件',
    icon: 'mdi:upload',
    click: () => {
      open()
    },
  },
  {
    label: '创建文件夹',
    icon: 'mdi:folder-plus',
    click: createFloader,
  },
  {
    label: '粘贴',
    icon: 'mdi:paste',
    click: () => {
      console.log('粘贴')
    },
  },
], [{
  label: '刷新',
  icon: 'mdi:refresh',
  click: refresh,
}]]

const items = [{
  label: '全部',
  icon: 'ph:cards-three-duotone',
}, {
  label: '图片',
  icon: 'ph:image-duotone',
}, {
  label: '视频',
  icon: 'ph:video-duotone',
}, {
  label: '音频',
  icon: 'ph:music-note-duotone',
}, {
  label: '文档',
  icon: 'ph:clipboard-text-duotone',
}]
</script>

<template>
  <ClientOnly>
    <teleport to="#header-left">
      <RcloneBreadcrumb />
    </teleport>
  </ClientOnly>
  <LayoutPage :loading="pending" :empty="data?.list?.length === 0">
    <template #empty>
      <Flex ref="dropZoneRef" direction="col" justify-content="center" align-items="center" class="relative h-full gap-4">
        <HoverZone />
        <img src="/images/system/logo.svg" alt="" class="w-24">
        <Flex direction="col" justify-content="center" align-items="center" class="gap-1">
          <h2 className="text-xl font-bold text-app-text">
            尚未上传对象
          </h2>
          <div className="w-full px-60 flex justify-center">
            <p className="text-app-text opacity-60 text-center">
              您可以拖动文件到该区域内上传，或是点击上传按钮和创建文件夹。
            </p>
          </div>
          <div class="space-x-2 mt-4">
            <UButton class="font-bold tracking-wide" variant="soft" @click="open">
              上传文件
            </UButton>

            <UButton class="font-bold tracking-wide" @click=" createFloader">
              创建文件夹
            </UButton>
            <!-- <ObjectCreate :on-submit="onCreate" /> -->
          </div>
        </Flex>
        <!-- <MinioCreateForm :on-submit="onCreateMinio" /> -->
      </Flex>
    </template>
    <Flex ref="dropZoneRef" direction="col" class=" gap-4 pt-2 h-full overflow-hidden">
      <Flex justify-content="between" class="w-full px-4">
        <Search v-model="search" />
        <Flex class="space-x-2">
          <UButton class="font-bold tracking-wide" variant="soft" @click="open">
            上传文件
          </UButton>
          <UButton class="font-bold tracking-wide" @click="createFloader">
            创建文件夹
          </UButton>
        </Flex>
      </Flex>
      <RcloneProgress />
      <Flex direction="col" class="flex-1 w-full gap-2 overflow-auto">
        <Flex justify-content="between" align-items="center" class="w-full sticky px-4 top-0 z-10">
          <!-- <DropdownMenu>
            <DropdownMenuTrigger>
              <UButton variant="secondary" size="icon">
                <Iconify icon="ph:faders-fill" class="size-5" />
              </UButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>时间正序</DropdownMenuItem>
              <DropdownMenuItem>时间逆序</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> -->
          <UTabs v-model="type" :items="items" :default-index="0" />
        </Flex>
        <ContextContainer>
          <ContextMenu :menu="menu" disable-prevent class="w-full h-full relative">
            <HoverZone />
            <Flex justify-content="start" align-items="start" class="w-full flex-wrap flex-1 px-4 gap-4 ">
              <RcloneFile v-for="(file) in list.filter(i => i.IsDir)" :key="file.Name" :file="file" />
              <RcloneFile v-for="(file) in list.filter(i => !i.IsDir)" :key="file.Name" :file="file" />
            </Flex>
          </ContextMenu>
        </ContextContainer>
      </Flex>
    </Flex>
  </LayoutPage>
</template>
