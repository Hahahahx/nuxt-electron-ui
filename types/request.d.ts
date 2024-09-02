
declare namespace HTTP {
  interface Response<T, C extends 401 | number = number> {
    /**
     * 错误码
     */
    Code?: C;
    /**
     * 返回的数据
     */
    Data: C extends 401 ? { Token: string } : T;
    /**
     * 错误消息
     */
    Msg?: string;
    [property: string]: any;
  }

}
declare namespace Page {
  interface Request {
    /**
     * 名称过滤
     */
    Name?: string;
    /**
     * 当前页
     */
    Page?: number;
    /**
     * 页大小
     */
    PageSize?: number;
    /**
     * 当前路径
     */
    Path?: string;
    /**
     * 模糊查询 多个用 , 分割
     */
    Search?: string;
    /**
     * 模糊查询字段 默认搜索Type字段 可选 名称Name 类型Type
     */
    SearchField?: string;
    /**
     * 名称Name,使用大小TotalSize,对象大小FileNum,配额大小QuotaSize
     */
    SortName?: string;
    /**
     * 升序 asc,降序desc
     */
    SortOrder?: string;
    /**
     * 文件类型 image图片 video视频 doc文档 audio音频 zip压缩包
     */
    Type?: string;
  }

  interface Response<T> {
    Rows: T[];
    Total: number;
  }

}
