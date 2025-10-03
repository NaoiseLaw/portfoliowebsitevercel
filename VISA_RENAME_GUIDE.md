# Visa Project File Renaming Guide

## Current Files vs Expected Names

### ✅ Already Correct:
- `visaid-graph.jpg` ✅
- `visaid-class-diagram.jpg` ✅  
- `visaid-ui-wireframes.jpg` ✅

### 🔄 Need to Rename:

1. **`VISA AID Full Project.jpeg`** → **`visaid-jiwoo.jpg`**
   - This will be the "Full Project" image referenced as Jiwoo in the project page

2. **`Me presenting.jpeg`** → **`presenting.jpg`**
   - This matches the presenting image in the gallery

3. **`Best team picture.jpeg`** → **`team.jpg`**
   - This matches the team image in the gallery

4. **`VISA AID GRAPH.jpeg`** → **DELETE** (duplicate)
   - You already have `visaid-graph.jpg` which is correct

## Manual Renaming Steps:

**In File Explorer:**
1. Navigate to: `public/images/projects/visa-disaster-response/`
2. Right-click each file and select "Rename"
3. Change the names as listed above

**Or via PowerShell (if you want to try again):**
```powershell
cd "public/images/projects/visa-disaster-response"
ren "VISA AID Full Project.jpeg" "visaid-jiwoo.jpg"
ren "Me presenting.jpeg" "presenting.jpg"  
ren "Best team picture.jpeg" "team.jpg"
del "VISA AID GRAPH.jpeg"
```

## Final Expected Result:
```
visa-disaster-response/
├── visaid-graph.jpg ✅
├── visaid-class-diagram.jpg ✅
├── visaid-ui-wireframes.jpg ✅
├── visaid-jiwoo.jpg (was "VISA AID Full Project.jpeg")
├── presenting.jpg (was "Me presenting.jpeg")
└── team.jpg (was "Best team picture.jpeg")
```

Once renamed, your Visa project page will display all images correctly! 🎉
