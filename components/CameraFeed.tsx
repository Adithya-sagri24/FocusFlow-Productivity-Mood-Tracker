import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';

interface CameraFeedProps {}

const CameraFeed = forwardRef((props: CameraFeedProps, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useImperativeHandle(ref, () => ({
    captureFrame: (): string | null => {
      if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        if (context) {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          // Return base64 encoded image without the 'data:image/jpeg;base64,' prefix.
          return canvas.toDataURL('image/jpeg').split(',')[1];
        }
      }
      return null;
    }
  }));

  return (
    <>
      <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </>
  );
});

export default CameraFeed;
