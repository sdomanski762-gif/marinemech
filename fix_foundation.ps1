$part1 = Get-Content 'FOUNDATIONV1.html' -TotalCount 685
$marine = Get-Content 'marine_specifics.js'
$endScript = "    </script>"
$part2 = Get-Content 'FOUNDATIONV1.html' | Select-Object -Skip 2105

$part1 + $marine + $endScript + $part2 | Set-Content 'FOUNDATIONV1.html' -Encoding UTF8
Write-Host "Fixed FOUNDATIONV1.html"

Copy-Item 'FOUNDATIONV1.html' -Destination 'codepen_ready.html' -Force
Write-Host "Updated codepen_ready.html"
