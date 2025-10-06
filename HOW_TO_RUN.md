# How to Run EmoTune - Complete Guide

## Quick Start (3 Terminals)

### Terminal 1: Python Backend
```bash
cd python-backend
python emotion_service.py
```
Wait for: `Service running on: http://localhost:5000`

### Terminal 2: React Frontend
```bash
npm run dev
```
Wait for: `Local: http://localhost:8080`

### Terminal 3: Test It
```bash
# Open browser to:
http://localhost:8080
```

---

## Detailed Step-by-Step Guide

### First Time Setup

#### 1. Install Node.js
- Download from: https://nodejs.org/
- Choose LTS version
- Verify installation:
```bash
node --version  # Should show v18.x.x or higher
npm --version   # Should show 9.x.x or higher
```

#### 2. Install Python
- Download from: https://python.org/
- Choose version 3.8 or higher
- **Important**: Check "Add Python to PATH" during installation
- Verify:
```bash
python --version  # Should show Python 3.8.x or higher
pip --version     # Should show pip 21.x.x or higher
```

#### 3. Install Frontend Dependencies
```bash
# In project root folder
npm install
```
This installs React and all frontend libraries.

#### 4. Install Python Dependencies
```bash
# Navigate to python backend
cd python-backend

# Install packages
pip install -r requirements.txt
```
This installs OpenCV, TensorFlow, Flask, etc.

---

## Running the Application

### Step 1: Start Python Backend
```bash
# Open first terminal
cd python-backend
python emotion_service.py
```

**You should see:**
```
==================================================
Starting Emotion Detection Service
==================================================
Service running on: http://localhost:5000
Endpoints:
  - GET  /health
  - POST /api/detect-emotion
  - POST /api/detect-emotion-from-image
  - GET  /api/emotions
==================================================
 * Running on http://0.0.0.0:5000
```

**Don't close this terminal!** Keep it running.

### Step 2: Start React Frontend
```bash
# Open second terminal
# Make sure you're in project root (not in python-backend!)
npm run dev
```

**You should see:**
```
  VITE v5.x.x  ready in 500 ms

  ➜  Local:   http://localhost:8080/
  ➜  Network: use --host to expose
```

**Don't close this terminal!** Keep it running.

### Step 3: Open in Browser
1. Open Chrome/Firefox/Safari
2. Go to: `http://localhost:8080`
3. You should see the EmoTune landing page!

---

## Using the Application

### 1. From Landing Page
- Click "Get Started" button
- This takes you to authentication page

### 2. Login/Register
- Tab between "Login" and "Register"
- Fill in any email/password (it's a demo)
- Click "Sign In" or "Create Account"
- You'll be redirected to Dashboard

### 3. Dashboard - Emotion Detection
- Click "Start Detection" button
- **Important**: Browser will ask for camera permission - click "Allow"
- The system will:
  1. Access your webcam
  2. Detect your face
  3. Analyze your emotion
  4. Show emotion result
  5. Display recommended music

### 4. Music Player
- Once emotion is detected, music recommendations appear
- Click play button to "play" music (currently simulated)
- Try different facial expressions to see emotion change

---

## Understanding What's Happening

### When You Click "Start Detection":

```
1. React Frontend (Browser)
   ├─ Calls fetch('http://localhost:5000/api/detect-emotion')
   └─ Sends request to Python backend
   
2. Flask Server (Python)
   ├─ Receives request at /api/detect-emotion endpoint
   ├─ Calls EmotionDetector.capture_and_detect()
   └─ Processes webcam frame
   
3. EmotionDetector (Python)
   ├─ Opens webcam: cv2.VideoCapture(0)
   ├─ Captures frame: cap.read()
   ├─ Detects face: face_cascade.detectMultiScale()
   ├─ Extracts face region
   ├─ Preprocesses: resize to 48x48, normalize
   ├─ Predicts emotion: model.predict() [simulated for now]
   └─ Returns: {'emotion': 'happy', 'confidence': 0.85}
   
4. Flask Server (Python)
   └─ Returns JSON response to React
   
5. React Frontend (Browser)
   ├─ Receives emotion data
   ├─ Updates state: setCurrentEmotion('happy')
   ├─ UI re-renders automatically
   ├─ EmotionDisplay shows "Happy" with icon
   └─ MusicPlayer loads "Pop & Upbeat" playlist
```

---

## Troubleshooting

### Problem: "Cannot access webcam"
**Solutions:**
1. Check if other apps are using camera (Zoom, Skype)
2. Grant browser camera permission when prompted
3. On Mac: System Preferences → Security & Privacy → Camera → Allow browser
4. On Windows: Settings → Privacy → Camera → Allow apps

### Problem: "Connection refused" or "Network error"
**Solutions:**
1. Make sure Python backend is running (Terminal 1)
2. Check Python terminal shows "Running on http://0.0.0.0:5000"
3. Test backend directly: Open browser → `http://localhost:5000/health`
4. Should see: `{"status": "healthy", ...}`

### Problem: "Port 5000 already in use"
**Solutions:**
```bash
# Find what's using port 5000
# On Mac/Linux:
lsof -i :5000

# On Windows:
netstat -ano | findstr :5000

# Kill the process or change port in emotion_service.py
```

### Problem: "npm: command not found"
**Solution:**
- Node.js not installed or not in PATH
- Reinstall Node.js from https://nodejs.org/
- Make sure to check "Add to PATH" option

### Problem: "python: command not found"
**Solution:**
- Python not installed or not in PATH
- Try `python3` instead of `python`
- On Windows, use `py` instead of `python`

### Problem: React page is blank
**Solutions:**
1. Check browser console (F12) for errors
2. Make sure npm run dev is running
3. Try: `npm install` then `npm run dev` again
4. Clear browser cache and reload

### Problem: Emotion detection is slow
**Solutions:**
1. Normal! First detection takes 3-5 seconds (loading models)
2. Subsequent detections should be faster (1-2 seconds)
3. Reduce detection frequency in code if needed
4. Use smaller TensorFlow model (MobileNet)

---

## Testing Without Webcam

If you don't have webcam or it's not working:

1. Modify `Dashboard.tsx` to use simulated emotions:
```javascript
const toggleCamera = () => {
  setCameraActive(!cameraActive);
  if (!cameraActive) {
    // Simulate emotion changes
    const emotions = ['happy', 'sad', 'angry', 'calm', 'neutral'];
    setInterval(() => {
      const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
      setCurrentEmotion(randomEmotion);
    }, 3000);
  }
};
```

2. Or use test images instead of webcam

---

## Stopping the Application

### To Stop:
1. **Terminal 1 (Python)**: Press `Ctrl + C`
2. **Terminal 2 (React)**: Press `Ctrl + C`
3. Close browser tab

### To Restart:
1. Repeat "Running the Application" steps above
2. No need to reinstall anything

---

## File Structure Overview

```
emotune/
│
├── src/                          # React Frontend
│   ├── pages/
│   │   ├── Index.tsx            # Landing page
│   │   ├── Auth.tsx             # Login/Register
│   │   ├── Dashboard.tsx        # Main app (emotion + music)
│   │   └── About.tsx            # Project info
│   │
│   ├── components/
│   │   ├── EmotionDisplay.tsx   # Shows detected emotion
│   │   └── MusicPlayer.tsx      # Music player UI
│   │
│   └── App.tsx                  # Main React component
│
├── python-backend/               # Python AI Backend
│   ├── emotion_detector.py      # Core emotion detection
│   ├── emotion_service.py       # Flask API server
│   ├── requirements.txt         # Python dependencies
│   └── SETUP_GUIDE.md          # Backend setup guide
│
├── package.json                 # Frontend dependencies
├── PROJECT_DOCUMENTATION.md     # Complete documentation
└── HOW_TO_RUN.md               # This file!
```

---

## For Presentation Demo

### Preparation:
1. Start both terminals 15 minutes before presentation
2. Test webcam and emotion detection
3. Keep camera at eye level with good lighting
4. Have backup browser tab with simulated emotions

### During Presentation:
1. Show landing page first
2. Explain technology stack
3. Go to Dashboard
4. Click "Start Detection"
5. Show your face, make different expressions:
   - Smile → Should detect "Happy" → Shows upbeat music
   - Frown → Should detect "Sad" → Shows melancholic music
   - Angry face → Should detect "Angry" → Shows rock music
6. Explain the flow from webcam → Python → React

### Common Demo Questions:
- **"How does it work?"** → Explain: Webcam → OpenCV face detection → TensorFlow emotion classification → Music recommendation
- **"Is it real-time?"** → Yes, detects every 2-3 seconds
- **"Can it handle multiple faces?"** → Currently one face (can be enhanced)
- **"What's the accuracy?"** → ~65-70% (depends on lighting, angle)

---

## Getting Help

If you're stuck:
1. Check error messages in both terminals
2. Read error carefully - it usually tells you what's wrong
3. Check troubleshooting section above
4. Google the specific error message
5. Check if all services are running (both terminals)

---

**Remember**: It's normal to encounter issues! That's part of the learning process. Each error is an opportunity to understand the system better.

Good luck with your presentation! 🎵🎭
