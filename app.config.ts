import { website } from './config/website'

export default defineAppConfig({
  ui: {
    primary: website.primaryColor, // 'blue',
    gray: website.backgroundColor, // 'slate',
  },
  methodColor: {
    GET: 'green',
    POST: 'sky',
    PUT: 'blue',
    DELETE: 'rose',
    PATCH: 'indigo',
  },
  orderStateColor: {
    success: 'green',
    pending: 'yellow',
    reject: 'red',
  },
  dashboardOverview: {
    AllocateBucketSize: 'allocate-bucket-size',
    BucketSurplusQuotaSize: 'bucket-surplus-quota-size',
    BuketSurplusSize: 'bucket-surplus-size',
    CurrentBucketNum: 'current-bucket-num',
    FileNum: 'file-num',
    MonthFileSize: 'month-file-size',
    QuotaSize: 'quota-size',
    TotalSize: 'total-size',
  },
})
