// Fix: Implemented the missing EmotionDetector component.
import React, { useState, useCallback } from 'react';
import { detectEmotion } from '../services/geminiService';
import Button from './ui/Button';

interface EmotionDetectorProps {
  onEmotionChange: (emotion: string) => void;
  videoElement: HTMLVideoElement | null;
}

const EmotionDetector: React.FC<EmotionDetectorProps> = ({ onEmotionChange, videoElement }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [detectedEmotion, setDetectedEmotion] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const blobToBase64 = (blob: Blob): Promise<string> => {
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
              if (typeof reader.result === 'string') {
                  // The result includes the data URL prefix, which needs to be removed.
                  const base64Data = reader.result.split(',')[1];
                  resolve(base64Data);
              } else {
                  reject(new Error('Failed to convert blob to base64 string.'));
              }
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
      });
  }

  const handleDetectEmotion = useCallback(async () => {
    if (!videoElement) {
        setError("Camera not ready.");
        return;
    }
    
    setIsLoading(true);
    setError(null);
    setDetectedEmotion(null);
    
    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const context = canvas.getContext('2d');
    if (!context) {
        setError("Could not get canvas context.");
        setIsLoading(false);
        return;
    }
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    
    canvas.toBlob(async (blob) => {
        if (!blob) {
            setError("Could not capture frame from camera.");
            setIsLoading(false);
            return;
        }

        try {
            const base64Data = await blobToBase64(blob);
            const mimeType = 'image/jpeg';
            const emotion = await detectEmotion(base64Data, mimeType);
            setDetectedEmotion(emotion);
            onEmotionChange(emotion);
        } catch (err: any) {
            setError(err.message || 'Failed to detect emotion.');
        } finally {
            setIsLoading(false);
        }
    }, 'image/jpeg', 0.9);

  }, [videoElement, onEmotionChange]);

  return (
    <div className="p-4 bg-gray-800 rounded-lg text-center">
      <h3 className="text-lg font-semibold mb-4">Mood Detection</h3>
      <Button onClick={handleDetectEmotion} disabled={isLoading || !videoElement}>
        {isLoading ? 'Analyzing...' : 'Detect My Mood'}
      </Button>
      {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}
      {detectedEmotion && !isLoading && (
        <p className="mt-3 text-lg">
          Detected Mood: <span className="font-bold capitalize text-purple-400">{detectedEmotion}</span>
        </p>
      )}
    </div>
  );
};

export default EmotionDetector;
