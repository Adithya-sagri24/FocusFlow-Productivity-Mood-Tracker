import React, { useRef, useState } from 'react';
import CameraFeed from './CameraFeed';
import { detectEmotionFromImage } from '../services/geminiService';
import Button from './ui/Button';
import Card from './ui/Card';

interface EmotionDetectorProps {
  onEmotionDetected: (emotion: string | null) => void;
}

const EmotionDetector: React.FC<EmotionDetectorProps> = ({ onEmotionDetected }) => {
  const cameraRef = useRef<{ captureFrame: () => string | null }>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDetectEmotion = async () => {
    if (cameraRef.current) {
      const base64Image = cameraRef.current.captureFrame();
      if (base64Image) {
        setIsDetecting(true);
        setError(null);
        try {
          const emotion = await detectEmotionFromImage(base64Image);
          onEmotionDetected(emotion);
          if (!emotion) {
            setError("Could not detect an emotion. Please try again.");
          }
        } catch (err) {
          setError("An error occurred during emotion detection.");
          console.error(err);
        } finally {
          setIsDetecting(false);
        }
      } else {
        setError("Could not capture an image from the camera.");
      }
    }
  };

  return (
    <Card>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-white mb-4">Mood Detector</h2>
        <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4 relative">
          <CameraFeed ref={cameraRef} />
        </div>
        <Button onClick={handleDetectEmotion} disabled={isDetecting} className="w-full">
          {isDetecting ? 'Detecting...' : 'Detect My Mood'}
        </Button>
        {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}
      </div>
    </Card>
  );
};

export default EmotionDetector;
