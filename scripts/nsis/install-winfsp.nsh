!macro customInstall
  File /oname=$PLUGINSDIR\winfsp-2.0.23075.msi "${BUILD_RESOURCES_DIR}\winfsp-2.0.23075.msi"
  ExecWait '"msiexec" /i "$PLUGINSDIR\winfsp-2.0.23075.msi" /passive'
!macroend
