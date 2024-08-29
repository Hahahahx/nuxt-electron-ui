export function useRequest<T, P>(fn?: (params?: P) => Promise<T>, config: {
  immediate?: boolean
  onSuccess?: (data: T) => void
  onError?: (error: string) => void
  onFinally?: () => void
  disableToast?: boolean
  params?: P
  toastConfig?: {
    title?: string
    description?: string
  }
} = {}): {
    loading: Ref<boolean>
    error: Ref<string | undefined>
    refetch: (params?: P) => Promise<any> | undefined
  } {
  config.immediate = config?.immediate ?? true

  // const [data, setData] = React.useState<T>(config.default)
  const loading = ref(false)
  const error = ref<string>()
  const alert = useAlert()

  const refetch = (params?: P) => {
    loading.value = true
    return fn?.(params).then((res) => {
      // setData(res)
      config?.onSuccess?.(res)
    }).catch((err) => {
      error.value = err
      console.log(err)
      config?.onError?.(err)
      !config?.disableToast && alert.error(
        config?.toastConfig?.title ?? err,
        config?.toastConfig?.description ?? new Date().toLocaleDateString(),
      )
    }).finally(() => {
      config?.onFinally?.()
      loading.value = false
    })
  }

  onMounted(() => {
    if (config?.immediate) {
      refetch(config?.params)
    }
  })

  return {
    loading,
    error,
    refetch,
  }
}
