import React, { useRef, useEffect } from 'react';
import Card from './ui/Card';

interface CameraFeedProps {
  onFrame: (video: HTMLVideoElement) => void;
}

const CameraFeed: React.FC<CameraFeedProps> = ({ onFrame }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    const enableStream = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera: ", err);
      }
    };

    enableStream();

    const intervalId = setInterval(() => {
      if (videoRef.current) {
        onFrame(videoRef.current);
      }
    }, 1000); // Process frame every second

    return () => {
      clearInterval(intervalId);
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [onFrame]);

  return (
    <Card>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Camera Feed</h3>
        <video ref={videoRef} autoPlay muted className="w-full h-auto rounded-md" />
      </div>
    </Card>
  );
};

export default CameraFeed;
