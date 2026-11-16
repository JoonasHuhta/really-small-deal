@echo off
setlocal
cd /d "%~dp0.."
if exist "%ProgramFiles%\Android\Android Studio\jbr\bin\java.exe" set "JAVA_HOME=%ProgramFiles%\Android\Android Studio\jbr"
if not exist node_modules\@capacitor\cli\package.json (
  call npm ci
  if errorlevel 1 exit /b 1
)
node tools\build.cjs
if errorlevel 1 exit /b 1
call npm test
if errorlevel 1 exit /b 1
call npm run android:sync
if errorlevel 1 exit /b 1
pushd android
call gradlew.bat assembleDebug lintDebug
set "RSD_BUILD_EXIT=%errorlevel%"
popd
if not "%RSD_BUILD_EXIT%"=="0" exit /b %RSD_BUILD_EXIT%
node tools\package-apk.cjs
exit /b %errorlevel%
