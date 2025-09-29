# Create placeholder SVG images for missing logos

$logos = @(
    "seic",
    "boi", 
    "epic",
    "grantthornton",
    "fringe",
    "rsgyc",
    "lse",
    "tcd", 
    "highschool",
    "google",
    "lse-hackathon"
)

foreach ($logo in $logos) {
    $svgContent = @"
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" fill="#f3f4f6" stroke="#d1d5db" stroke-width="2"/>
  <text x="50" y="45" font-family="Arial, sans-serif" font-size="12" text-anchor="middle" fill="#6b7280">$logo</text>
  <text x="50" y="65" font-family="Arial, sans-serif" font-size="8" text-anchor="middle" fill="#9ca3af">logo</text>
</svg>
"@
    
    $svgContent | Out-File -FilePath "$logo.png" -Encoding UTF8
    Write-Host "Created placeholder for $logo.png"
}

Write-Host "All placeholder logos created!"
