$ErrorActionPreference = "Stop"

$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
$env:ANDROID_SDK_ROOT = "$env:LOCALAPPDATA\Android\Sdk"

Write-Host "Configuring sdk.dir in local.properties..."
$sdkDir = "$env:LOCALAPPDATA\Android\Sdk"
$sdkDirEscaped = $sdkDir -replace "\\", "\\"
Set-Content -Path "$PSScriptRoot\android\local.properties" -Value "sdk.dir=$sdkDirEscaped"

Write-Host "Using Java from:"
& "$env:JAVA_HOME\bin\java.exe" -version

Write-Host "Building APK..."
Set-Location -Path "$PSScriptRoot\android"
.\gradlew.bat assembleDebug
