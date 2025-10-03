# PowerShell script to create placeholder images for missing project heroes
# This creates simple SVG placeholders that can be replaced later

$projects = @(
    @{name="alexander"; title="Alexander HR Chatbot"},
    @{name="reddit-analyzer"; title="Reddit Racism Analyzer"},
    @{name="second-bite"; title="Second Bite"},
    @{name="sentiment"; title="Sentiment Dashboard"},
    @{name="simulator"; title="3D Portfolio Simulator"},
    @{name="voice-extension"; title="Voice-to-Speech Extension"}
)

foreach ($project in $projects) {
    $dir = "public/images/projects/$($project.name)"
    $heroPath = "$dir/hero.png"
    
    if (!(Test-Path $heroPath)) {
        # Create a simple SVG placeholder
        $svg = @"
<svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#f3f4f6"/>
  <text x="400" y="200" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="#6b7280">
    $($project.title)
  </text>
  <text x="400" y="230" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="#9ca3af">
    Project Hero Image
  </text>
</svg>
"@
        
        # Save as SVG first, then we can convert or use directly
        $svgPath = "$dir/hero.svg"
        $svg | Out-File -FilePath $svgPath -Encoding UTF8
        Write-Host "Created placeholder: $svgPath"
    }
}

Write-Host "Placeholder creation complete!"
