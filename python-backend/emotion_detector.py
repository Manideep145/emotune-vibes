"""
Emotion Detection Service
Uses OpenCV for face detection and TensorFlow for emotion classification
"""

import cv2
import numpy as np
from tensorflow import keras
import json
import sys

class EmotionDetector:
    def __init__(self):
        """Initialize the emotion detector with face cascade and model"""
        # Load Haar Cascade for face detection
        self.face_cascade = cv2.CascadeClassifier(
            cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
        )
        
        # Emotion labels matching our frontend
        self.emotions = ['angry', 'happy', 'sad', 'calm', 'neutral']
        
        # Load pre-trained model (you would train this separately)
        # For demo purposes, we'll simulate predictions
        self.model = None  # In production: keras.models.load_model('emotion_model.h5')
        
    def preprocess_face(self, face_img):
        """
        Preprocess face image for model input
        
        Args:
            face_img: Cropped face image from OpenCV
            
        Returns:
            Preprocessed image ready for model
        """
        # Resize to model input size (48x48 for most emotion models)
        face_resized = cv2.resize(face_img, (48, 48))
        
        # Convert to grayscale if not already
        if len(face_resized.shape) == 3:
            face_gray = cv2.cvtColor(face_resized, cv2.COLOR_BGR2GRAY)
        else:
            face_gray = face_resized
            
        # Normalize pixel values to 0-1 range
        face_normalized = face_gray / 255.0
        
        # Reshape for model input: (1, 48, 48, 1)
        face_final = face_normalized.reshape(1, 48, 48, 1)
        
        return face_final
    
    def predict_emotion(self, face_img):
        """
        Predict emotion from face image
        
        Args:
            face_img: Preprocessed face image
            
        Returns:
            Emotion label (string)
        """
        if self.model:
            # Real prediction using trained model
            predictions = self.model.predict(face_img, verbose=0)
            emotion_idx = np.argmax(predictions[0])
            confidence = predictions[0][emotion_idx]
            
            return self.emotions[emotion_idx], float(confidence)
        else:
            # Simulated prediction for demo
            # In real implementation, this would use the actual model
            import random
            emotion = random.choice(self.emotions)
            confidence = random.uniform(0.6, 0.95)
            
            return emotion, confidence
    
    def detect_face_and_emotion(self, frame):
        """
        Detect face in frame and predict emotion
        
        Args:
            frame: Image frame from webcam
            
        Returns:
            Dictionary with emotion and confidence
        """
        # Convert to grayscale for face detection
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        
        # Detect faces
        faces = self.face_cascade.detectMultiScale(
            gray,
            scaleFactor=1.1,  # How much image size is reduced at each scale
            minNeighbors=5,   # How many neighbors each candidate rectangle should have
            minSize=(30, 30)  # Minimum face size
        )
        
        if len(faces) == 0:
            return {
                'success': False,
                'message': 'No face detected',
                'emotion': 'neutral',
                'confidence': 0.0
            }
        
        # Get largest face (closest to camera)
        largest_face = max(faces, key=lambda rect: rect[2] * rect[3])
        x, y, w, h = largest_face
        
        # Extract face region
        face_roi = gray[y:y+h, x:x+w]
        
        # Preprocess face
        processed_face = self.preprocess_face(face_roi)
        
        # Predict emotion
        emotion, confidence = self.predict_emotion(processed_face)
        
        return {
            'success': True,
            'emotion': emotion,
            'confidence': confidence,
            'face_location': {'x': int(x), 'y': int(y), 'w': int(w), 'h': int(h)}
        }
    
    def capture_and_detect(self):
        """
        Capture frame from webcam and detect emotion
        
        Returns:
            Dictionary with detection results
        """
        # Open webcam
        cap = cv2.VideoCapture(0)
        
        if not cap.isOpened():
            return {
                'success': False,
                'message': 'Could not access webcam',
                'emotion': 'neutral',
                'confidence': 0.0
            }
        
        # Capture frame
        ret, frame = cap.read()
        
        if not ret:
            cap.release()
            return {
                'success': False,
                'message': 'Could not read frame',
                'emotion': 'neutral',
                'confidence': 0.0
            }
        
        # Detect emotion
        result = self.detect_face_and_emotion(frame)
        
        # Release camera
        cap.release()
        
        return result

def main():
    """Main function to run emotion detection"""
    try:
        detector = EmotionDetector()
        result = detector.capture_and_detect()
        
        # Output as JSON for Node.js to read
        print(json.dumps(result))
        
    except Exception as e:
        error_result = {
            'success': False,
            'message': f'Error: {str(e)}',
            'emotion': 'neutral',
            'confidence': 0.0
        }
        print(json.dumps(error_result))

if __name__ == '__main__':
    main()
