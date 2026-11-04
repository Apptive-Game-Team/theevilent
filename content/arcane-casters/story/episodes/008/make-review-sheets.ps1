param([switch]$RequireAll)
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$episodeDirectory = $PSScriptRoot
$manifestFile = Join-Path $episodeDirectory 'selected-pages.json'
if (Test-Path -LiteralPath $manifestFile) {
    $pageEntries = (Get-Content -LiteralPath $manifestFile -Raw | ConvertFrom-Json).pages
} else {
    $pageEntries = 1..18 | ForEach-Object {
        $imageFile = if ($_ -eq 15) { 'art-v1/shark-interception-splash.png' } else { 'art-v1/page-{0:d2}.png' -f $_ }
        [pscustomobject]@{ number = $_; src = $imageFile }
    }
}
$missingPages = @($pageEntries | Where-Object { -not (Test-Path -LiteralPath (Join-Path $episodeDirectory $_.src)) })
if ($RequireAll -and $missingPages.Count -gt 0) { throw ('Missing pages: ' + ($missingPages.number -join ', ')) }
$labelFont = [System.Drawing.Font]::new('Arial', 18)
$labelBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::White)
try {
    for ($sheetIndex = 0; $sheetIndex -lt [math]::Ceiling($pageEntries.Count / 6); $sheetIndex++) {
        $sheetImage = [System.Drawing.Bitmap]::new(960, 1040)
        $sheetGraphics = [System.Drawing.Graphics]::FromImage($sheetImage)
        try {
            $sheetGraphics.Clear([System.Drawing.Color]::FromArgb(16, 35, 53))
            $sheetGraphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            for ($cellIndex = 0; $cellIndex -lt 6 -and ($sheetIndex * 6 + $cellIndex) -lt $pageEntries.Count; $cellIndex++) {
                $pageEntry = $pageEntries[$sheetIndex * 6 + $cellIndex]
                $columnIndex = $cellIndex % 3
                $rowIndex = [math]::Floor($cellIndex / 3)
                $cellX = [int]($columnIndex * 320 + 10)
                $cellY = [int]($rowIndex * 520 + 36)
                $sheetGraphics.DrawString(('{0:d2}' -f [int]$pageEntry.number), $labelFont, $labelBrush, $cellX, ($cellY - 30))
                $pagePath = Join-Path $episodeDirectory $pageEntry.src
                if (Test-Path -LiteralPath $pagePath) {
                    $pageImage = [System.Drawing.Image]::FromFile($pagePath)
                    try { $sheetGraphics.DrawImage($pageImage, [System.Drawing.Rectangle]::new($cellX, $cellY, 300, 450)) } finally { $pageImage.Dispose() }
                }
            }
            $reviewFile = Join-Path $episodeDirectory ('review-{0:d2}.jpg' -f ($sheetIndex + 1))
            $sheetImage.Save($reviewFile, [System.Drawing.Imaging.ImageFormat]::Jpeg)
            Write-Output $reviewFile
        } finally { $sheetGraphics.Dispose(); $sheetImage.Dispose() }
    }
} finally { $labelFont.Dispose(); $labelBrush.Dispose() }
