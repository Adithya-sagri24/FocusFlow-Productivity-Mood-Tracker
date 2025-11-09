// Fix: Implemented the EmotionDetector component.
import React, { useState, useCallback, useRef } from 'react';
import CameraFeed from './CameraFeed';
import { getEmotionFromImage } from '../services/geminiService';
import Button from './ui/Button';
import Card from './ui/Card';

interface EmotionDetectorProps {
  onEmotionDetected: (emotion: string) => void;
}

const EmotionDetector: React.FC<EmotionDetectorProps> = ({ onEmotionDetected }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastDetectedEmotion, setLastDetectedEmotion] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result.split(',')[1]);
        } else {
          reject(new Error('Failed to convert blob to base64 string'));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const handleFrame = (video: HTMLVideoElement) => {
    videoRef.current = video;
  };

  const analyzeEmotion = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    setLoading(true);
    setError(null);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');

    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(async (blob) => {
        if (blob) {
          try {
            const base64Image = await blobToBase64(blob);
            const emotion = await getEmotionFromImage(base64Image);
            setLastDetectedEmotion(emotion);
            onEmotionDetected(emotion);
          } catch (err) {
            setError('Failed to analyze emotion.');
            console.error(err);
          } finally {
            setLoading(false);
          }
        } else {
          setError('Failed to capture frame.');
          setLoading(false);
        }
      }, 'image/jpeg');
    }
  }, [onEmotionDetected]);

  return (
    <Card>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4 text-center">Mood Playlist Generator</h2>
        <p className="text-gray-400 text-center mb-4">Let's find the perfect music for your current mood.</p>
        <CameraFeed onFrame={handleFrame} />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        <div className="mt-4 text-center">
            <Button onClick={analyzeEmotion} disabled={loading} className="mb-4">
                {loading ? 'Analyzing...' : 'Get My Vibe'}
            </Button>
            {error && <p className="text-red-400">{error}</p>}
            {lastDetectedEmotion && !loading && (
                <p className="text-lg">Detected Mood: <span className="font-bold capitalize text-green-400">{lastDetectedEmotion}</span></p>
            )}
        </div>
      </div>
    </Card>
  );
};

export default EmotionDetector;
