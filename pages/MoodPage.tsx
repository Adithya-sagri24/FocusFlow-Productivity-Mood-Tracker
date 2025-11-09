// Fix: Implemented the missing Mood page to integrate emotion detection and music.
import React, { useState, useEffect } from 'react';
import { useSpotifyAuth } from '../hooks/useSpotifyAuth';
import { getPlaylistForEmotion } from '../services/spotifyService';
import type { SpotifyPlaylist, SpotifyTrack } from '../types';
import Playlist from '../components/Playlist';
import MusicPlayer from '../components/MusicPlayer';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const moods = ['Happy', 'Sad', 'Focus', 'Chill', 'Energetic', 'Romantic'];

const MoodPage: React.FC = () => {
  const { token, login } = useSpotifyAuth();
  const [playlist, setPlaylist] = useState<SpotifyPlaylist | null>(null);
  const [currentEmotion, setCurrentEmotion] = useState<string | null>(null);
  const [isLoadingPlaylist, setIsLoadingPlaylist] = useState(false);
  const [currentPlayingUri, setCurrentPlayingUri] = useState<string | null>(null);
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null);

  useEffect(() => {
    if (currentEmotion && token) {
      const fetchPlaylist = async () => {
        setIsLoadingPlaylist(true);
        setPlaylist(null);
        const fetchedPlaylist = await getPlaylistForEmotion(currentEmotion, token);
        setPlaylist(fetchedPlaylist);
        setIsLoadingPlaylist(false);
      };
      fetchPlaylist();
    }
  }, [currentEmotion, token]);

  const handleEmotionSelect = (emotion: string) => {
    setCurrentEmotion(emotion);
  };
  
  const handlePlayTrack = (trackUri: string) => {
      if (currentPlayingUri === trackUri) {
          // Stop playing if the same track is clicked again
          setCurrentPlayingUri(null);
          setCurrentTrack(null);
      } else {
          const trackToPlay = playlist?.tracks.items.find(item => item.track?.uri === trackUri)?.track;
          if (trackToPlay?.preview_url) {
              setCurrentPlayingUri(trackUri);
              setCurrentTrack(trackToPlay);
          } else {
              alert("This track does not have a preview available.");
          }
      }
  };
  
  const handleTrackEnd = () => {
    setCurrentPlayingUri(null);
    setCurrentTrack(null);
  };

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-3xl font-bold mb-4">Connect to Spotify</h1>
        <p className="text-gray-400 mb-6">
          Log in to Spotify to get music recommendations based on your mood.
        </p>
        <Button onClick={login}>Login with Spotify</Button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Mood Music</h1>
      <Card>
          <div className="p-6">
              <h2 className="text-xl font-semibold text-center mb-4">How are you feeling?</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {moods.map(mood => (
                      <Button 
                        key={mood}
                        variant={currentEmotion === mood ? 'primary' : 'secondary'}
                        onClick={() => handleEmotionSelect(mood)}
                      >
                          {mood}
                      </Button>
                  ))}
              </div>

              {isLoadingPlaylist && <p className="text-center">Finding a vibe for you...</p>}
              
              {!isLoadingPlaylist && playlist && (
                <Playlist 
                  playlist={playlist} 
                  onPlay={handlePlayTrack}
                  currentPlayingUri={currentPlayingUri}
                />
              )}
              
              {!isLoadingPlaylist && !playlist && currentEmotion && (
                <p className="text-center text-gray-400">
                  Could not find a playlist for "{currentEmotion}". Try another mood.
                </p>
              )}

              {!isLoadingPlaylist && !playlist && !currentEmotion && (
                <p className="text-center text-gray-400">
                  Select a mood to get a personalized playlist.
                </p>
              )}
          </div>
      </Card>
      <MusicPlayer track={currentTrack} onEnd={handleTrackEnd} />
    </div>
  );
};

export default MoodPage;
