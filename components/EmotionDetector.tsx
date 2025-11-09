import React, { useState, useCallback } from 'react';
import CameraFeed from './CameraFeed';
import Button from './ui/Button';

interface EmotionDetectorProps {
  onEmotionDetected: (emotion: string) => void;
}

const EmotionDetector: React.FC<EmotionDetectorProps> = ({ onEmotionDetected }) => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectedEmotion, setDetectedEmotion] = useState<string | null>(null);

  // This is a placeholder. A real implementation would use a library like face-api.js
  const handleFrame = useCallback((video: HTMLVideoElement) => {
    if (!isDetecting) return;
    console.log("Processing frame for emotion detection...", video.currentTime);
    // Dummy detection logic
    const emotions = ['happy', 'sad', 'neutral', 'angry', 'surprised'];
    const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
    setDetectedEmotion(randomEmotion);
    onEmotionDetected(randomEmotion);
    setIsDetecting(false); // Stop after one detection for this demo
  }, [isDetecting, onEmotionDetected]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Detect Your Mood</h2>
      {isDetecting && <CameraFeed onFrame={handleFrame} />}
      <div className="mt-4 text-center">
        <Button onClick={() => setIsDetecting(!isDetecting)}>
          {isDetecting ? 'Stop Detection' : 'Detect from Camera'}
        </Button>
        {detectedEmotion && <p className="mt-4">Detected Mood: {detectedEmotion}</p>}
      </div>
    </div>
  );
};

export default EmotionDetector;
