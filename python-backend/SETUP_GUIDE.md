# Python Backend Setup Guide

## Step-by-Step Installation

### 1. Install Python
Make sure Python 3.8+ is installed:
```bash
python --version
# Should show: Python 3.8.x or higher
```

### 2. Create Virtual Environment (Recommended)
```bash
# Navigate to python-backend folder
cd python-backend

# Create virtual environment
python -m venv venv

# Activate it
# On Windows:
venv\Scripts\activate

# On Mac/Linux:
source venv/bin/activate
```

### 3. Install Dependencies
```bash
# Install all required packages
pip install -r requirements.txt

# This installs:
# - opencv-python: Face detection
# - tensorflow: Emotion classification
# - numpy: Numerical operations
# - Flask: Web server
# - Flask-CORS: Allow React to connect
```

### 4. Test Installation
```bash
# Test if OpenCV works
python -c "import cv2; print('OpenCV version:', cv2.__version__)"

# Test if TensorFlow works
python -c "import tensorflow as tf; print('TensorFlow version:', tf.__version__)"

# Test if Flask works
python -c "from flask import Flask; print('Flask installed!')"
```

### 5. Run the Service
```bash
python emotion_service.py
```

You should see:
```
==================================================
Starting Emotion Detection Service
==================================================
Service running on: http://localhost:5000
...
```

### 6. Test the API
Open another terminal and test:
```bash
# Test health check
curl http://localhost:5000/health

# Expected response:
# {"status": "healthy", "service": "emotion-detection", "version": "1.0.0"}
```

## Troubleshooting

### Problem: "No module named cv2"
**Solution:**
```bash
pip uninstall opencv-python
pip install opencv-python
```

### Problem: "Could not access webcam"
**Solution:**
- Check if another app is using webcam (Zoom, Skype, etc.)
- On Mac: Grant terminal camera permissions in System Preferences
- On Windows: Check camera privacy settings

### Problem: "TensorFlow installation failed"
**Solution:**
```bash
# Install CPU-only version (smaller, easier)
pip install tensorflow-cpu
```

### Problem: "Port 5000 already in use"
**Solution:**
Edit `emotion_service.py` and change port:
```python
app.run(host='0.0.0.0', port=5001, debug=True)  # Changed to 5001
```

## How the Code Works

### emotion_detector.py
```python
class EmotionDetector:
    def __init__(self):
        # Load face detection model
        self.face_cascade = cv2.CascadeClassifier(...)
        
    def capture_and_detect(self):
        # 1. Open webcam
        cap = cv2.VideoCapture(0)
        
        # 2. Capture one frame
        ret, frame = cap.read()
        
        # 3. Detect face
        faces = self.face_cascade.detectMultiScale(gray)
        
        # 4. Predict emotion
        emotion = self.predict_emotion(face)
        
        # 5. Return result
        return {'emotion': emotion, 'confidence': 0.85}
```

### emotion_service.py
```python
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/detect-emotion', methods=['POST'])
def detect_emotion():
    # Call detector
    result = detector.capture_and_detect()
    
    # Return JSON
    return jsonify(result)

app.run(port=5000)
```

## API Endpoints

### 1. Health Check
```bash
GET http://localhost:5000/health
```
Response:
```json
{
  "status": "healthy",
  "service": "emotion-detection",
  "version": "1.0.0"
}
```

### 2. Detect Emotion (Webcam)
```bash
POST http://localhost:5000/api/detect-emotion
```
Response:
```json
{
  "success": true,
  "emotion": "happy",
  "confidence": 0.87,
  "face_location": {"x": 100, "y": 150, "w": 200, "h": 200}
}
```

### 3. Detect Emotion (Image)
```bash
POST http://localhost:5000/api/detect-emotion-from-image
Body: {"image": "base64_encoded_image"}
```
Response: Same as above

### 4. Get Supported Emotions
```bash
GET http://localhost:5000/api/emotions
```
Response:
```json
{
  "emotions": ["angry", "happy", "sad", "calm", "neutral"],
  "count": 5
}
```

## Understanding the Flow

```
1. React calls → http://localhost:5000/api/detect-emotion
2. Flask receives request
3. Flask calls → EmotionDetector.capture_and_detect()
4. EmotionDetector:
   a. Opens webcam
   b. Captures frame
   c. Detects face using OpenCV
   d. Preprocesses face (resize, normalize)
   e. Predicts emotion (currently simulated, would use TensorFlow model)
5. Returns emotion to Flask
6. Flask returns JSON to React
7. React updates UI
```

## Next Steps

To use a real trained model:
1. Train model on FER-2013 dataset
2. Save model: `model.save('emotion_model.h5')`
3. Update `emotion_detector.py`:
```python
def __init__(self):
    self.model = keras.models.load_model('emotion_model.h5')
```

For training resources, see:
- FER-2013 dataset: https://www.kaggle.com/datasets/msambare/fer2013
- Training tutorial: Will provide separate training script if needed
