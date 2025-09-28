# 🧪 3D Recruitment Simulator - Comprehensive Testing Checklist

## 🚀 Quick Start Testing

### Debug Controls
- **Ctrl+Shift+D**: Toggle debug console
- **Ctrl+Shift+T**: Run automated test suite
- **Ctrl+Shift+P**: Toggle performance monitor

---

## 📋 Manual Testing Checklist

### ✅ 3D Environment Tests

#### Scene Loading & Rendering
- [ ] **Page loads without errors in console**
  - Open browser dev tools (F12)
  - Check console for any red error messages
  - Should see "3D Recruitment Simulator fully initialized!" message

- [ ] **White floor appears (no gaps or missing textures)**
  - Look for clean white floor covering the entire area
  - No black gaps or missing sections
  - Floor should have subtle shadows

- [ ] **Three characters spawn in correct positions**
  - Technical Naoise: Left side (blue shirt)
  - Leadership Naoise: Center (green shirt)  
  - Creative Naoise: Right side (red shirt)
  - All should have name labels above them

- [ ] **Characters walk around randomly**
  - Characters should move around their areas
  - Movement should be smooth and natural
  - Characters should face their movement direction

- [ ] **Characters face player during conversation**
  - When you get close to a character, they should turn to face you
  - This should happen automatically when dialogue opens

- [ ] **Lighting looks warm and professional**
  - Scene should be well-lit with warm, natural lighting
  - No harsh shadows or dark areas
  - California sky background should be visible

- [ ] **Sky background appears blue**
  - Background should be a pleasant sky blue color
  - No black or white backgrounds

#### Office Environment
- [ ] **Desks and furniture render correctly**
  - Three desks with computers and chairs
  - Whiteboard on back wall
  - Coffee station and plants visible

- [ ] **Roomba moves around**
  - Blue circular Roomba should be moving around the floor
  - Should bounce off walls with "Bonk!" text

---

### ✅ Interaction Tests

#### Camera Controls
- [ ] **WASD keys move camera**
  - W: Move forward
  - S: Move backward  
  - A: Move left
  - D: Move right
  - Movement should be smooth and responsive

- [ ] **Mouse/arrow keys rotate view**
  - Click on screen to enable mouse look
  - Mouse movement should rotate camera
  - Arrow keys should also rotate view
  - ESC should exit mouse look when in dialogue

- [ ] **'Press E to talk' prompt appears near characters**
  - When within 3 units of a character, prompt should appear
  - Should show character's name
  - Prompt should disappear when moving away

#### Dialogue System
- [ ] **E key opens dialogue box**
  - Press E when near a character
  - Dialogue box should appear at bottom of screen
  - Character should face the player

- [ ] **Sample questions appear**
  - Three sample questions should be shown
  - Questions should be relevant to that character's role
  - Questions should be clickable

- [ ] **Custom question input works**
  - Text input field should be functional
  - Can type custom questions
  - Enter key or button should submit questions

- [ ] **ESC key closes dialogue**
  - Press ESC to close dialogue box
  - Should return to normal camera controls
  - Character should resume normal movement

- [ ] **Space bar makes player dance**
  - Press SPACE to make camera dance
  - Should see floating dance emojis
  - Camera should bounce and rotate

---

### ✅ API & Conversation Tests

#### Question Submission
- [ ] **Questions submit successfully**
  - Click sample questions or type custom ones
  - Should see loading spinner
  - Response should appear after 1-2 seconds

- [ ] **Loading spinner appears**
  - Spinning circle should show while AI is "thinking"
  - Should last 1-2 seconds for realistic feel

- [ ] **AI responses mention specific achievements**
  - Technical: Should mention 94% accuracy, Python, BERT
  - Leadership: Should mention $1.5B funds, 20+ people teams
  - Creative: Should mention government adoption, user research

- [ ] **Each character has different personality**
  - Technical: Focus on ML, automation, technical challenges
  - Leadership: Focus on teams, strategy, stakeholder management
  - Creative: Focus on user research, design thinking, innovation

- [ ] **Conversations feel natural and professional**
  - Responses should be detailed and specific
  - Should reference real achievements and experience
  - Tone should be professional but engaging

#### Error Handling
- [ ] **Error handling works when API fails**
  - Disconnect internet or block API calls
  - Should show fallback responses
  - No crashes or broken UI

---

### ✅ Navigation Tests

#### Dropdown Menu
- [ ] **Dropdown menu appears on hover/click**
  - Hover over "Projects" in navigation
  - Dropdown should appear with project links
  - Should have smooth animation

- [ ] **All navigation links work**
  - Home: Goes to portfolio homepage
  - About: Scrolls to about section
  - Interactive Experience: Opens simulator
  - Skills: Scrolls to skills section
  - Contact: Scrolls to contact section

- [ ] **Menu works on mobile**
  - Resize browser to mobile width
  - Hamburger menu should appear
  - Tap to open/close mobile menu
  - All links should work on mobile

- [ ] **Active page is highlighted**
  - Current page should be highlighted in navigation
  - Should have different background color

- [ ] **Smooth animations work**
  - Dropdown should animate in/out smoothly
  - Mobile menu should slide in/out
  - No jerky or broken animations

- [ ] **Keyboard navigation accessible**
  - Tab through navigation items
  - Enter/Space should activate links
  - Arrow keys should work in dropdowns

---

### ✅ Performance Tests

#### Loading Performance
- [ ] **Loads in under 5 seconds**
  - Page should be interactive within 5 seconds
  - Three.js should load and render quickly
  - No long loading screens

#### Runtime Performance
- [ ] **Runs smoothly on desktop (60fps)**
  - Check performance monitor (Ctrl+Shift+P)
  - FPS should stay above 50 on desktop
  - No stuttering or frame drops

- [ ] **Works acceptably on mobile (30fps+)**
  - Test on mobile device or mobile browser mode
  - Should maintain 30+ FPS
  - Touch controls should be responsive

- [ ] **No memory leaks during extended use**
  - Use simulator for 10+ minutes
  - Memory usage should remain stable
  - No gradual slowdown or crashes

- [ ] **API responses under 3 seconds**
  - Ask several questions
  - All responses should come back within 3 seconds
  - No timeouts or long waits

---

### ✅ Debug & Testing Tools

#### Debug Console
- [ ] **Debug console shows relevant information**
  - Press Ctrl+Shift+D to open
  - Should show initialization logs
  - Should log interactions and events

- [ ] **Performance monitor displays correctly**
  - Press Ctrl+Shift+P to open
  - Should show FPS, object count, memory usage
  - Numbers should update in real-time

- [ ] **Test suite runs successfully**
  - Press Ctrl+Shift+T to run tests
  - Should show test results panel
  - All tests should pass (green checkmarks)

#### Error Detection
- [ ] **No console errors during normal use**
  - Use simulator normally for 5 minutes
  - Check console for any red errors
  - Only expected logs should appear

- [ ] **Graceful handling of edge cases**
  - Try clicking rapidly
  - Try submitting empty questions
  - Try moving camera outside bounds
  - Should handle all gracefully

---

## 🔧 Troubleshooting Guide

### Common Issues & Solutions

#### Three.js Not Loading
- **Problem**: Black screen, no 3D content
- **Solution**: Check internet connection, try refreshing page
- **Debug**: Check console for CDN loading errors

#### Characters Not Moving
- **Problem**: Characters are static
- **Solution**: Wait 2-3 seconds for initialization
- **Debug**: Check if animation loop is running

#### E Key Not Working
- **Problem**: Can't interact with characters
- **Solution**: Make sure you're close enough (within 3 units)
- **Debug**: Check if interaction prompt appears

#### API Not Responding
- **Problem**: Questions don't get answered
- **Solution**: Check if Express server is running on port 3001
- **Debug**: Check network tab for failed requests

#### Performance Issues
- **Problem**: Low FPS or stuttering
- **Solution**: Close other browser tabs, try different browser
- **Debug**: Use performance monitor to identify bottlenecks

---

## 📊 Test Results Template

```
Test Date: ___________
Browser: ___________
Device: ___________
Screen Resolution: ___________

3D Environment: ___/8 tests passed
Interaction: ___/6 tests passed  
API & Conversation: ___/6 tests passed
Navigation: ___/6 tests passed
Performance: ___/4 tests passed
Debug Tools: ___/3 tests passed

Overall: ___/33 tests passed

Issues Found:
- 
- 
- 

Notes:
- 
- 
- 
```

---

## 🎯 Success Criteria

### Minimum Viable Product
- ✅ All 3 characters spawn and move
- ✅ E key interaction works
- ✅ At least 2 sample questions work per character
- ✅ Navigation dropdown functions
- ✅ Mobile menu works
- ✅ No critical errors in console

### Excellent Experience
- ✅ All tests pass
- ✅ 60+ FPS on desktop
- ✅ 30+ FPS on mobile
- ✅ All API responses under 2 seconds
- ✅ Smooth animations throughout
- ✅ Professional, polished feel

---

## 🚀 Next Steps After Testing

1. **Document any bugs found**
2. **Test on multiple devices/browsers**
3. **Get feedback from real users**
4. **Optimize based on performance data**
5. **Add any missing features identified**

Remember: This is a comprehensive testing suite. Not every test needs to pass for a good experience, but the more that pass, the better the user experience will be!
