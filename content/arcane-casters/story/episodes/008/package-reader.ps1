$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem
Add-Type -AssemblyName System.Drawing
$episodeDirectory = $PSScriptRoot
$pageSelection = Get-Content -LiteralPath (Join-Path $episodeDirectory 'selected-pages.json') -Raw | ConvertFrom-Json
$pageEntries = @($pageSelection.pages | Sort-Object number)
if ($pageEntries.Count -ne 18 -or (@($pageEntries.number | Select-Object -Unique)).Count -ne 18) { throw 'The reader needs exactly 18 distinct pages.' }
$pageFigures = [System.Collections.Generic.List[string]]::new()
$navigationLinks = [System.Collections.Generic.List[string]]::new()
$validationRows = [System.Collections.Generic.List[object]]::new()
foreach ($pageEntry in $pageEntries) {
    $pagePath = Join-Path $episodeDirectory $pageEntry.src
    if (-not (Test-Path -LiteralPath $pagePath)) { throw ('Missing page: ' + $pageEntry.src) }
    $pageImage = [System.Drawing.Image]::FromFile($pagePath)
    try {
        if ($pageImage.Width -ne 1024 -or $pageImage.Height -ne 1536) { throw ('Unexpected image size: ' + $pageEntry.src) }
    } finally { $pageImage.Dispose() }
    $pageNumber = [int]$pageEntry.number
    $safeTitle = [System.Net.WebUtility]::HtmlEncode($pageEntry.title)
    $pageFigures.Add(('<figure id="page-{0}"><figcaption>{0} / 18 · {1}</figcaption><a href="{2}"><img src="{2}" loading="{3}" width="1024" height="1536" alt="{0}페이지: {1}"></a></figure>' -f $pageNumber, $safeTitle, $pageEntry.src, $(if ($pageNumber -eq 1) { 'eager' } else { 'lazy' })))
    $navigationLinks.Add(('<a href="#page-{0}" aria-label="{0}페이지">{0:d2}</a>' -f $pageNumber))
    $validationRows.Add([pscustomobject]@{ number = $pageNumber; src = $pageEntry.src; width = 1024; height = 1536; sha256 = (Get-FileHash -LiteralPath $pagePath -Algorithm SHA256).Hash.ToLowerInvariant() })
}
$readerTemplate = @'
<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,noimageindex"><title>Arcane Casters · 8화</title><style>
:root{color-scheme:dark;--bg:#102335;--ink:#eef3f8;--link:#9bdcff;--muted:#bbcad7}*{box-sizing:border-box}html{scroll-padding-top:110px}body{margin:0;background:var(--bg);color:var(--ink);font-family:system-ui,sans-serif}header,main,footer{max-width:900px;margin:auto}header{padding:20px 16px 12px}h1{margin:0 0 6px;font-size:24px}p{margin:0;color:var(--muted)}nav{position:sticky;top:0;z-index:2;background:var(--bg);padding:10px 16px;display:flex;justify-content:center;gap:6px;flex-wrap:wrap;border-bottom:1px solid var(--muted)}a{color:var(--link)}nav a{padding:5px 7px;text-decoration:none;border:1px solid var(--muted);border-radius:4px;font-variant-numeric:tabular-nums}nav a:hover,nav a:focus{background:var(--ink);color:var(--bg)}figure{margin:0 0 22px;scroll-margin-top:110px}figcaption{padding:10px 16px;color:var(--muted)}img{display:block;width:100%;height:auto}footer{padding:20px 16px 40px}
</style></head><body><header><h1>Arcane Casters · 8화</h1><p>18페이지 · 작화 검토본</p></header><nav aria-label="페이지 이동">__NAV__</nav><main>__PAGES__</main><footer><a href="#page-1">처음으로</a></footer></body></html>
'@
$readerHtml = $readerTemplate.Replace('__NAV__', ($navigationLinks -join '')).Replace('__PAGES__', ($pageFigures -join "`n"))
[System.IO.File]::WriteAllText((Join-Path $episodeDirectory 'index.html'), $readerHtml, [System.Text.UTF8Encoding]::new($false))
$validationRows | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath (Join-Path $episodeDirectory 'image-validation.json') -Encoding utf8
$archivePath = Join-Path $episodeDirectory 'episode-008-reader-v4.zip'
$archiveVersion = 2
while (Test-Path -LiteralPath $archivePath) {
    $archivePath = Join-Path $episodeDirectory ('episode-008-reader-v4-{0}.zip' -f $archiveVersion)
    $archiveVersion++
}
$readerArchive = [System.IO.Compression.ZipFile]::Open($archivePath, [System.IO.Compression.ZipArchiveMode]::Create)
try {
    $portableReader = $readerHtml
    foreach ($pageEntry in $pageEntries) {
        $archiveImagePath = 'pages/page-{0:d2}.png' -f [int]$pageEntry.number
        $portableReader = $portableReader.Replace($pageEntry.src, $archiveImagePath)
        [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($readerArchive, (Join-Path $episodeDirectory $pageEntry.src), $archiveImagePath, [System.IO.Compression.CompressionLevel]::Fastest) | Out-Null
    }
    $indexEntry = $readerArchive.CreateEntry('index.html')
    $indexWriter = [System.IO.StreamWriter]::new($indexEntry.Open(), [System.Text.UTF8Encoding]::new($false))
    try { $indexWriter.Write($portableReader) } finally { $indexWriter.Dispose() }
} finally { $readerArchive.Dispose() }
$checkArchive = [System.IO.Compression.ZipFile]::OpenRead($archivePath)
try {
    if ($checkArchive.Entries.Count -ne 19) { throw 'Archive needs 18 images and one reader.' }
    if (@($checkArchive.Entries | Where-Object { $_.FullName -like 'pages/*.png' }).Count -ne 18) { throw 'Archive page count mismatch.' }
} finally { $checkArchive.Dispose() }
Write-Output ([pscustomobject]@{ pages = $pageEntries.Count; imagesVerified = $validationRows.Count; archive = $archivePath; bytes = (Get-Item -LiteralPath $archivePath).Length } | ConvertTo-Json)
