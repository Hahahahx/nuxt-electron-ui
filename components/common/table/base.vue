<script setup lang="ts" generic="T extends { [key: string]: any;}">
const { list, columns, menus, refresh, defaultPageSizes = [10, 20, 30, 40] } = defineProps<{
  defaultPageSizes?: number[]
  list: T[]
  pageTotal: number
  columns: {
    key: keyof T | 'action'
    label?: string
    sortable?: boolean
  }[]
  menus?: (row: T) => any[][]
  refresh?: (params?: any) => Promise<any>
  loading?: boolean
  disableQuery?: boolean
  searchText?: string
  error?: any
}>()

defineSlots<{
  selected: any
  filter: any
  [k: string]: (scope: { row: T }) => any
}>()

const { query, selected, pageSize, pageIndex, sort } = defineModels<{
  query?: string
  selected?: T[]
  pageSize: number
  pageIndex: number
  sort?: {
    column: keyof T
    direction: 'asc' | 'desc'
  }
}>()

const attrs = useAttrs()

onMounted(() => {
  pageSize.value = defaultPageSizes[0]
  pageIndex.value = 1
})

if (menus) {
  // eslint-disable-next-line vue/no-mutating-props
  columns.push({
    label: '',
    key: 'opt-actions',
  })
}

const showColumns = ref<{ key: any, label?: string }[]>([...columns])

const selectedColumns: any = computed(() => columns.filter(c => showColumns.value.some(sc => sc.key === c.key)))
const slots = useSlots()
</script>

<template>
  <UDashboardToolbar class="w-full">
    <template #left>
      <UInput
        v-if="!disableQuery"
        v-model="query"
        icon="i-heroicons-funnel"
        autocomplete="off"
        placeholder="搜索..."
        class="hidden lg:block"
        @keydown.esc="$event.target.blur()"
      >
        <template #trailing>
          <UKbd value="/" />
        </template>
      </UInput>
      <slot name="filter" />
    </template>

    <template #right>
      <slot name="selected" />
      <UTooltip v-if="refresh" text="刷新">
        <UButton icon="i-solar-refresh-circle-line-duotone" variant="ghost" color="gray" @click="refresh" />
      </UTooltip>
      <UTooltip text="列表项">
        <USelectMenu
          v-model="showColumns"
          :options="columns.filter(i => i.label)"
          multiple
          placeholder="Columns"
          class="[&_.group]:min-w-[200px]"
        >
          <UButton color="gray" class="flex-1 justify-between">
            <UIcon name="i-heroicons-adjustments-horizontal-solid" class="h-5 w-5" />
          </UButton>
        </USelectMenu>
      </UTooltip>
    </template>
  </UDashboardToolbar>
  <UTable
    v-model="selected"
    v-model:sort="sort"
    :loading="loading"
    sort-mode="manual"
    :rows="list"
    :page-total="list.length"
    :columns="selectedColumns"
    v-bind="attrs"
    class="w-full"
    :ui="{ divide: 'divide-gray-200 dark:divide-gray-800' }"
    :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No items.' }"
  >
    <template #empty-state>
      <div v-if="error" class="flex flex-col items-center justify-center gap-3 py-10">
        <UIcon
          name="i-solar-danger-triangle-bold-duotone"
          class=" text-rose-500 dark:text-rose-700 w-20 h-20 opacity-90"
        />
        <span class="italic text-sm max-w-[500px] text-center">{{ error?.message }}</span>
        <UButton variant="soft" label="刷新" @click="refresh" />
      </div>
      <div v-else class="flex flex-col items-center justify-center py-6 gap-3">
        <UIcon name="i-solar-box-bold-duotone" class="w-20 h-20 opacity-90" />
        <span class="italic text-sm typography-muted">没有数据~</span>
      </div>
    </template>

    <template v-for="(item, key, i) in slots" :key="i" #[key]="{ row }">
      <slot :name="key" :row="row" />
    </template>

    <template v-if="menus" #opt-actions-data="{ row }">
      <div class="flex justify-end items-center">
        <div class="lg:block hidden">
          <ULink v-for="(item, i) in menus(row).flat().filter(menu => menu?.show)" :key="i" :class="{ 'opacity-60': item.disabled }" :to="item.to" :disabled="item.disabled">
            <UButton :color="item.disabled ? 'gray' : 'primary'" variant="ghost" :disabled="item.disabled" @click="item.click">
              {{ item.label }}
            </UButton>
          </ULink>
        </div>
        <UDropdown :items="menus(row)">
          <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </div>
    </template>
  </UTable>
  <!-- Start coding here -->
  <!-- <div class="relative overflow-hidden rounded-b-md bg-gray-50 dark:bg-gray-900/50"> -->
  <nav
    class="flex w-full flex-col items-center justify-between p-4 md:flex-row md:items-center space-y-3 md:space-y-0"
    aria-label="Table navigation"
  >
    <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
      一共
      <span class="font-semibold text-gray-900 dark:text-white">{{ pageTotal }}</span>
      条
    </span>
    <ul class="inline-flex items-stretch space-x-2">
      <USelect v-model="pageSize" color="white" variant="outline" :options="defaultPageSizes" />
      <UPagination v-model="pageIndex" :page-count="pageSize" :total="pageTotal" />
    </ul>
  </nav>
</template>
