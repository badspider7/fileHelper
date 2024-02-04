# 安装时写入
!macro customInstall
   # 64 位操作
   SetRegView 64
   WriteRegStr HKCR "*\shell\rubick" "" "open w&ith FileHelper"
   WriteRegStr HKCR "*\shell\rubick" "Icon" "$INSTDIR\fileHelper.exe"
   WriteRegStr HKCR "*\shell\rubick\command" "" '"$INSTDIR\fileHelper.exe" "search" "%1"'
   # 32 位操作
   SetRegView 32
   WriteRegStr HKCR "*\shell\rubick" "" "open w&ith FileHelper"
   WriteRegStr HKCR "*\shell\rubick" "Icon" "$INSTDIR\fileHelper.exe"
   WriteRegStr HKCR "*\shell\rubick\command" "" '"$INSTDIR\fileHelper.exe" "search" "%1"'
!macroend
# 卸载时删除
!macro customUninstall
   DeleteRegKey HKCR "*\shell\fileHelper"
!macroend
