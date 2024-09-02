declare namespace Server {
  interface Option {
    dlna: {
      ListenAddr: string
      FriendlyName: string
      LogTrace: boolean
      InterfaceNames: []
      AnnounceInterval: number
    }
    filter: {
      DeleteExcluded: boolean
      FilterRule: string
      FilterFrom: any
      ExcludeRule: any
      ExcludeFrom: any
      IncludeRule: any
      IncludeFrom: any
      ExcludeFile: any
      FilesFrom: any
      FilesFromRaw: any
      MetaRules: {
        FilterRule: any
        FilterFrom: any
        ExcludeRule: any
        ExcludeFrom: any
        IncludeRule: any
        IncludeFrom: any
      }
      MinAge: number
      MaxAge: number
      MinSize: number
      MaxSize: number
      IgnoreCase: boolean
    }
    ftp: {
      ListenAddr: string
      PublicIP: string
      PassivePorts: string
      BasicUser: string
      BasicPass: string
      TLSCert: string
      TLSKey: string
    }
    log: {
      File: string
      Format: string
      UseSyslog: boolean
      SyslogFacility: string
      LogSystemdSupport: boolean
    }
    main: {
      LogLevel: string
      StatsLogLevel: string
      UseJSONLog: boolean
      DryRun: boolean
      Interactive: boolean
      CheckSum: boolean
      SizeOnly: boolean
      IgnoreTimes: boolean
      IgnoreExisting: boolean
      IgnoreErrors: boolean
      ModifyWindow: number
      Checkers: number
      Transfers: number
      ConnectTimeout: number
      Timeout: number
      ExpectContinueTimeout: number
      Dump: string
      InsecureSkipVerify: boolean
      DeleteMode: number
      MaxDelete: number
      MaxDeleteSize: number
      TrackRenames: boolean
      TrackRenamesStrategy: string
      Retries: number
      RetriesInterval: number
      LowLevelRetries: number
      UpdateOlder: boolean
      NoGzip: boolean
      MaxDepth: number
      IgnoreSize: boolean
      IgnoreChecksum: boolean
      IgnoreCaseSync: boolean
      FixCase: boolean
      NoTraverse: boolean
      CheckFirst: boolean
      NoCheckDest: boolean
      NoUnicodeNormalization: boolean
      NoUpdateModTime: boolean
      NoUpdateDirModTime: boolean
      DataRateUnit: string
      CompareDest: any
      CopyDest: any
      BackupDir: string
      Suffix: string
      SuffixKeepExtension: boolean
      UseListR: boolean
      BufferSize: number
      BwLimit: string
      BwLimitFile: string
      TPSLimit: number
      TPSLimitBurst: number
      BindAddr: string
      DisableFeatures: any
      UserAgent: string
      Immutable: boolean
      AutoConfirm: boolean
      StreamingUploadCutoff: number
      StatsFileNameLength: number
      AskPassword: boolean
      PasswordCommand: any
      UseServerModTime: boolean
      MaxTransfer: number
      MaxDuration: number
      CutoffMode: string
      MaxBacklog: number
      MaxStatsGroups: number
      StatsOneLine: boolean
      StatsOneLineDate: boolean
      StatsOneLineDateFormat: string
      ErrorOnNoTransfer: boolean
      Progress: boolean
      ProgressTerminalTitle: boolean
      Cookie: boolean
      UseMmap: boolean
      CaCert: any
      ClientCert: string
      ClientKey: string
      MultiThreadCutoff: number
      MultiThreadStreams: number
      MultiThreadSet: boolean
      MultiThreadChunkSize: number
      MultiThreadWriteBufferSize: number
      OrderBy: string
      UploadHeaders: any
      DownloadHeaders: any
      Headers: any
      MetadataSet: any
      RefreshTimes: boolean
      NoConsole: boolean
      TrafficClass: number
      FsCacheExpireDuration: number
      FsCacheExpireInterval: number
      DisableHTTP2: boolean
      HumanReadable: boolean
      KvLockTime: number
      DisableHTTPKeepAlives: boolean
      Metadata: boolean
      ServerSideAcrossConfigs: boolean
      TerminalColorMode: string
      DefaultTime: string
      Inplace: boolean
      PartialSuffix: string
      MetadataMapper: any
    }
    mount: {
      DebugFUSE: boolean
      AllowNonEmpty: boolean
      AllowRoot: boolean
      AllowOther: boolean
      DefaultPermissions: boolean
      WritebackCache: boolean
      Daemon: boolean
      DaemonWait: number
      MaxReadAhead: number
      ExtraOptions: []
      ExtraFlags: []
      AttrTimeout: number
      DeviceName: string
      VolumeName: string
      NoAppleDouble: boolean
      NoAppleXattr: boolean
      DaemonTimeout: number
      AsyncRead: boolean
      NetworkMode: boolean
      DirectIO: boolean
      CaseInsensitive: any
    }
    rc: {
      HTTP: {
        ListenAddr: [
          string,
        ]
        BaseURL: string
        ServerReadTimeout: number
        ServerWriteTimeout: number
        MaxHeaderBytes: number
        TLSCert: string
        TLSKey: string
        TLSCertBody: any
        TLSKeyBody: any
        ClientCA: string
        MinTLSVersion: string
        AllowOrigin: string
      }
      Auth: {
        HtPasswd: string
        Realm: string
        BasicUser: string
        BasicPass: string
        Salt: string
      }
      Template: {
        Path: string
      }
      Enabled: boolean
      Serve: boolean
      ServeNoModTime: boolean
      Files: string
      NoAuth: boolean
      WebUI: boolean
      WebGUIUpdate: boolean
      WebGUIForceUpdate: boolean
      WebGUINoOpenBrowser: boolean
      WebGUIFetchURL: string
      EnableMetrics: boolean
      JobExpireDuration: number
      JobExpireInterval: number
    }
    sftp: {
      ListenAddr: string
      HostKeys: any
      AuthorizedKeys: string
      User: string
      Pass: string
      NoAuth: boolean
      Stdio: boolean
    }
    vfs: {
      NoSeek: boolean
      NoChecksum: boolean
      ReadOnly: boolean
      NoModTime: boolean
      DirCacheTime: number
      Refresh: boolean
      PollInterval: number
      Umask: number
      UID: number
      GID: number
      DirPerms: number
      FilePerms: number
      ChunkSize: number
      ChunkSizeLimit: number
      CacheMode: string
      CacheMaxAge: number
      CacheMaxSize: number
      CacheMinFreeSpace: number
      CachePollInterval: number
      CaseInsensitive: boolean
      BlockNormDupes: boolean
      WriteWait: number
      ReadWait: number
      WriteBack: number
      ReadAhead: number
      UsedIsSize: boolean
      FastFingerprint: boolean
      DiskSpaceTotalSize: number
    }
  }

  namespace Core {
    interface Stats {
      bytes: number
      checks: number
      deletedDirs: number
      deletes: number
      elapsedTime: number
      errors: number
      eta: number
      fatalError: boolean
      renames: number
      retryError: boolean
      serverSideCopies: number
      serverSideCopyBytes: number
      serverSideMoveBytes: number
      serverSideMoves: number
      speed: number
      totalBytes: number
      totalChecks: number
      totalTransfers: number
      transferring: Transferring[]
      transfers: number
      transferTime: number
    }

    interface Transferring {
      bytes: number
      eta: number
      group: string
      name: string
      percentage: number
      size: number
      speed: number
      speedAvg: number
      srcFs: string
    }

    interface Bwlimit {
      bytesPerSecond: number
      bytesPerSecondRx: number
      bytesPerSecondTx: number
      rate: string
    }

    interface Version {
      arch: string
      decomposed: number[]
      goTags: string
      goVersion: string
      isBeta: boolean
      isGit: boolean
      linking: string
      os: string
      version: string
    }
  }
}
