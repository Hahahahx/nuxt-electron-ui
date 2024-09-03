<script setup lang="ts">
const files = useFileStore()
const electron = useElectron()
function openfile(path: string, filename: string) {
  electron.actions?.openFile({
    paths: [path, filename],
  })
}
</script>

<template>
  <div class="flex flex-col items-start justify-center px-6">
    <h1 class="text-4xl font-bold mb-4">
      下载列表
    </h1>
    <p class="text-lg">
      当前下载列表共有 {{ files.downloads.length }} 个文件
    </p>
  </div>
  <UDivider class="my-5" />
  <UAccordion
    multiple
    :items="files.downloads as any[]" class="my-2" :ui="{
      container: ' hover:bg-gray-500/5 my-2',
    }"
  >
    <template #default="{ item: f, open }">
      <Flex align-items="center" :class="{ 'bg-gray-500/5': open }" class=" rounded mb-1 p-4 px-5 gap-2 cursor-pointer">
        <BaseFile :filename="f.name" class="size-16" :loading="f.status === 'downloading' && f.percent === 100" />
        <Flex class="flex-1" direction="col">
          <Flex class="w-full">
            <div class="flex-1 space-y-1">
              <h6 class="text-sm">
                {{ f.name }}
              </h6>
              <p class=" typography-muted !text-xs">
                {{ byteTrans.mertic(f.size) }}
              </p>
            </div>
            <Flex direction="col" class="gap-1" justify-content="end" align-items="end">
              <UBadge>
                {{ f.status }}
              </UBadge>
              <p class="typography-muted text-xs">
                {{ format.dateTimeS(f.insertTime) }}
              </p>
            </Flex>
          </Flex>
          <UProgress :value="f.percent" class="mt-2 h-[2px] rounded-none bg-gray-500/20" />
        </Flex>
      </Flex>
    </template>

    <template #item="{ item: f }">
      <Flex justify-content="between" class=" px-6 py-3 font-mono text-sm">
        <div>
          <span>{{ f.params.fs }}</span>
          <span>{{ f.params.remote }}</span>
          <UBadge variant="soft">
            {{ f.path }}
          </UBadge>
        </div>
        <Flex class="gap-1">
          <UButton :disabled="f.percent !== 100" size="xs" class="font-bold text-xs text-primary" variant="ghost" @click="openfile(f.path, f.name)">
            <span class="font-bold text-xs tracking-[2px]">打开</span>
          </UButton>

          <UButton size="xs" class=" text-rose-500" variant="ghost" @click="files.removeDownload(f.url)">
            <span class="font-bold text-xs tracking-[2px]">删除</span>
          </UButton>
        </Flex>
      </Flex>
    </template>
  </UAccordion>

  <div
    v-if="!files.downloads.length"
    class="flex-col flex justify-center items-center min-h-[500px] h-full gap-4"
  >
    <UIcon name="solar:box-minimalistic-line-duotone" class="opacity-80 w-16 h-16" />
    <span class=" typography-muted">暂无文件下载</span>
  </div>
</template>
