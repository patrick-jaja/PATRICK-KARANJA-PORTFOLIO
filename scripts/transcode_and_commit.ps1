<#
transcode_and_commit.ps1

PowerShell script to transcode video source files under the repository's assets/ folder
into GitHub-Pages-friendly MP4s (H.264 + AAC, faststart, 720p cap), generate 1280x720
thumbnails, and commit & push the generated files to the current branch.

Usage (run from the repository root):
  powershell -ExecutionPolicy Bypass -File .\scripts\transcode_and_commit.ps1

Notes:
- Requires ffmpeg on PATH (https://ffmpeg.org/download.html)
- Requires git on PATH and that the repo has an upstream named 'origin' and you have push rights
- The script WILL add and commit files under assets/videos/ and assets/videos/thumbnails/
  (it will not modify files outside assets/)
- By default the script skips files that already have an output present unless you pass -Force

#>
param(
    [string]$AssetsDir = "assets",
    [switch]$Force,
    [switch]$NoPush
)

function Write-Log { param($m) Write-Host "[transcode] $m" }

# Resolve repository root (should be current directory)
$RepoRoot = (Get-Location).Path
if(-not (Test-Path "$RepoRoot\$AssetsDir")){
    Write-Error "Assets directory not found: $RepoRoot\$AssetsDir. Run this script from the repo root or pass -AssetsDir.";
    exit 2
}

# Ensure ffmpeg exists
try{
    $null = & ffmpeg -version 2>$null
} catch {
    Write-Error "ffmpeg not found on PATH. Install ffmpeg and ensure it's available in PATH: https://ffmpeg.org/download.html"
    exit 3
}

$SourceRoot = Join-Path $RepoRoot $AssetsDir
$DestRoot = Join-Path $SourceRoot "videos"
$ThumbRoot = Join-Path $DestRoot "thumbnails"

# Create destination directories
if(-not (Test-Path $DestRoot)){ New-Item -ItemType Directory -Path $DestRoot -Force | Out-Null }
if(-not (Test-Path $ThumbRoot)){ New-Item -ItemType Directory -Path $ThumbRoot -Force | Out-Null }

# Gather source video files under assets/ but exclude anything already under assets/videos to avoid loops
$videoExt = @('*.mov','*.mp4','*.webm','*.mkv')
$sourceFiles = Get-ChildItem -Path $SourceRoot -Recurse -Include $videoExt | Where-Object { $_.FullName -notmatch "[\\/]assets[\\/]videos([\\/]|$)" }

if($sourceFiles.Count -eq 0){ Write-Log "No source video files found under $SourceRoot (excluding assets/videos). Nothing to do."; exit 0 }

Write-Log "Found $($sourceFiles.Count) source video file(s) to process. This may take a while depending on file sizes."

$processed = @()

foreach($file in $sourceFiles){
    $inPath = $file.FullName
    # compute relative path under assets
    $rel = $inPath.Substring($SourceRoot.Length).TrimStart('\','/')
    $relDir = Split-Path $rel -Parent

    # output path under assets/videos preserving subfolders
    $outDir = Join-Path $DestRoot $relDir
    if(-not (Test-Path $outDir)){ New-Item -ItemType Directory -Path $outDir -Force | Out-Null }

    $baseName = [System.IO.Path]::GetFileNameWithoutExtension($file.Name)
    $outFile = Join-Path $outDir ($baseName + '.mp4')

    # thumbnail path (flat thumbnails directory) — use baseName.jpg
    $thumbFile = Join-Path $ThumbRoot ($baseName + '.jpg')

    if((Test-Path $outFile) -and (-not $Force)){
        Write-Log "Skipping (exists): $outFile"; continue
    }

    Write-Log "Transcoding: $rel → ${outFile.Substring($RepoRoot.Length+1)}"

    # ffmpeg transcode command
    $vf = "scale='min(1280,iw)':'min(720,ih)':force_original_aspect_ratio=decrease"
    $args = @('-y', '-i', $inPath,
              '-c:v','libx264','-crf','23','-preset','medium',
              '-vf', $vf,
              '-c:a','aac','-b:a','128k',
              '-movflags','+faststart', $outFile)
    $proc = Start-Process -FilePath ffmpeg -ArgumentList $args -NoNewWindow -Wait -PassThru
    if($proc.ExitCode -ne 0){ Write-Error "ffmpeg failed for $inPath (exit $($proc.ExitCode)). Skipping."; continue }

    # generate thumbnail at 1s (fallback to 0s if file shorter)
    Write-Log "Generating thumbnail: ${thumbFile.Substring($RepoRoot.Length+1)}"
    $thumbArgs = @('-ss','00:00:01','-i',$outFile,'-vframes','1','-vf',"scale='min(1280,iw)':'min(720,ih)':force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,format=yuv420p",'-q:v','2',$thumbFile,'-y')
    $tproc = Start-Process -FilePath ffmpeg -ArgumentList $thumbArgs -NoNewWindow -Wait -PassThru
    if($tproc.ExitCode -ne 0){
        Write-Error "Thumbnail generation failed for $outFile (exit $($tproc.ExitCode))."
        # continue — video exists even if thumbnail failed
    }

    $processed += @{ source=$inPath; out=$outFile; thumb=$thumbFile }
}

if($processed.Count -eq 0){ Write-Log "No files were processed (maybe all outputs were already present and -Force was not used)."; exit 0 }

Write-Log "Processed $($processed.Count) file(s). Preparing git commit..."

# Git add & commit
Set-Location $RepoRoot
# Ensure .git exists
if(-not (Test-Path (Join-Path $RepoRoot '.git'))){ Write-Error "This directory does not look like a git repository (no .git). Aborting commit."; exit 4 }

# Add processed outputs
foreach($p in $processed){
    git add -- "$(Resolve-Path -LiteralPath $p.out)" 2>$null
    if(Test-Path $p.thumb){ git add -- "$(Resolve-Path -LiteralPath $p.thumb)" 2>$null }
}

$commitMsg = "Add optimized videos and thumbnails for Video Showcase (transcoded $($processed.Count) files)"

# Show summary and ask for confirmation unless -Force is provided
Write-Host "\nFiles to be committed:"
$processed | ForEach-Object { Write-Host " - " $(Resolve-Path -LiteralPath $_.out).Path }
$processed | ForEach-Object { if(Test-Path $_.thumb){ Write-Host " - " $(Resolve-Path -LiteralPath $_.thumb).Path } }

if(-not $Force){
    $yn = Read-Host "Proceed with git commit and push? (y/n)"
    if($yn -notin @('y','Y','yes','Yes')){ Write-Log "Aborted by user. You can manually git add/commit the generated files."; exit 0 }
}

# Commit
git commit -m "$commitMsg"
if($LASTEXITCODE -ne 0){ Write-Error "Git commit failed. Check git status and try to commit manually."; exit 5 }

if($NoPush){ Write-Log "NoPush flag set — skipping git push."; exit 0 }

# Push
Write-Log "Pushing to origin (current branch)"
git push origin HEAD
if($LASTEXITCODE -ne 0){ Write-Error "Git push failed. Please push manually."; exit 6 }

Write-Log "Done. Optimized videos and thumbnails are committed and pushed."
