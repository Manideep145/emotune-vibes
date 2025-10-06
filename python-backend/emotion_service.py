"""
Flask API Service for Emotion Detection
Provides REST API endpoints for the frontend to call
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
import cv2
import numpy as np
from emotion_detector import EmotionDetector
import base64

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing for React

# Initialize detector once (faster than creating new instance each time)
detector = EmotionDetector()

@app.route('/health', methods=['GET'])
def health_check():
    """Check if service is running"""
    return jsonify({
        'status': 'healthy',
        'service': 'emotion-detection',
        'version': '1.0.0'
    })

@app.route('/api/detect-emotion', methods=['POST'])
def detect_emotion():
    """
    Detect emotion from webcam
    
    Returns:
        JSON with emotion, confidence, and success status
    """
    try:
        result = detector.capture_and_detect()
        return jsonify(result)
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e),
            'emotion': 'neutral',
            'confidence': 0.0
        }), 500

@app.route('/api/detect-emotion-from-image', methods=['POST'])
def detect_emotion_from_image():
    """
    Detect emotion from uploaded image (base64)
    
    Request body:
        {
            "image": "base64_encoded_image"
        }
    
    Returns:
        JSON with emotion, confidence, and success status
    """
    try:
        data = request.get_json()
        
        if 'image' not in data:
            return jsonify({
                'success': False,
                'message': 'No image provided',
                'emotion': 'neutral',
                'confidence': 0.0
            }), 400
        
        # Decode base64 image
        image_data = base64.b64decode(data['image'].split(',')[1])
        nparr = np.frombuffer(image_data, np.uint8)
        frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if frame is None:
            return jsonify({
                'success': False,
                'message': 'Invalid image data',
                'emotion': 'neutral',
                'confidence': 0.0
            }), 400
        
        # Detect emotion
        result = detector.detect_face_and_emotion(frame)
        return jsonify(result)
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e),
            'emotion': 'neutral',
            'confidence': 0.0
        }), 500

@app.route('/api/emotions', methods=['GET'])
def get_emotions():
    """Get list of supported emotions"""
    return jsonify({
        'emotions': detector.emotions,
        'count': len(detector.emotions)
    })

if __name__ == '__main__':
    print("=" * 50)
    print("Starting Emotion Detection Service")
    print("=" * 50)
    print("Service running on: http://localhost:5000")
    print("Endpoints:")
    print("  - GET  /health")
    print("  - POST /api/detect-emotion")
    print("  - POST /api/detect-emotion-from-image")
    print("  - GET  /api/emotions")
    print("=" * 50)
    
    app.run(host='0.0.0.0', port=5000, debug=True)
