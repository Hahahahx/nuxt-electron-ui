export function useAlert() {
  const toast = useToast()

  const alert = {
    info: (title: string, desc?: string) => {
      console.log(title, desc)
      toast.add({
        id: new Date().getTime().toString(), // id should be unique
        title,
        icon: 'i-solar-danger-broken',
        description: desc,
      })
    },
    success: (title: string, desc?: string) => {
      toast.add({
        id: new Date().getTime().toString(),
        title: title ?? '操作成功',
        icon: 'i-heroicons-check-circle-20-solid',
        color: 'green',
        description: desc,
        ui: {
          description: 'break-all w-full',
        },
      })
    },
    error: (title: string, desc?: string) => {
      toast.add({
        id: new Date().getTime().toString(),
        title: title ?? '操作失败',
        icon: 'i-heroicons-exclamation-triangle-16-solid',
        color: 'red',
        description: desc,
      })
    },
  }

  function ToastWhenErr(handler: (...args: any) => Promise<void>, params?: {
    title: string
    desc: string
  }) {
    return async (...args: any) => {
      try {
        await handler(...args)
      }
      catch (err: any) {
        alert.error(params?.title ?? '操作失败', (params?.desc ?? '原因：') + err.toString())
      }
    }
  }

  return {
    ...alert,
    catch: ToastWhenErr,
  }
}
