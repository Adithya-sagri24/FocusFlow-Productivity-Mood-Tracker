import React from 'react';
import Card from '../components/ui/Card';
import EmotionDetector from '../components/EmotionDetector';
import MusicPlayer from '../components/MusicPlayer';

const MoodPage: React.FC = () => {
  const handleEmotionDetected = (emotion: string) => {
    // This could trigger something in the MusicPlayer, for example.
    console.log(`Emotion detected: ${emotion}, you could now suggest a playlist.`);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Mood Analysis</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
              <div className="p-6">
                <EmotionDetector onEmotionDetected={handleEmotionDetected} />
              </div>
          </Card>
          <MusicPlayer />
      </div>
    </div>
  );
};

export default MoodPage;
