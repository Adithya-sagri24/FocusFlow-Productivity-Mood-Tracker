// Fix: Implemented the missing Mood page to integrate emotion detection and music.
import React, { useState, useEffect, useRef } from 'react';
import { useSpotifyAuth } from '../hooks/useSpotifyAuth';
import { getPlaylistForEmotion } from '../services/spotifyService';
import type { SpotifyPlaylist, SpotifyTrack } from '../types';
import CameraFeed from '../components/CameraFeed';
import EmotionDetector from '../components/EmotionDetector';
import Playlist from '../components/Playlist';
import MusicPlayer from '../components/MusicPlayer';
import Button from '../components/ui/Button';

const MoodPage: React.FC = () => {
  const { token, login } = useSpotifyAuth();
  const [playlist, setPlaylist] = useState<SpotifyPlaylist | null>(null);
  const [currentEmotion, setCurrentEmotion] = useState<string | null>(null);
  const [isLoadingPlaylist, setIsLoadingPlaylist] = useState(false);
  const [currentPlayingUri, setCurrentPlayingUri] = useState<string | null>(null);
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

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

  const handleEmotionChange = (emotion: string) => {
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

  const captureFrame = (video: HTMLVideoElement) => {
    videoRef.current = video;
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <CameraFeed onFrame={captureFrame} />
          <EmotionDetector onEmotionChange={handleEmotionChange} videoElement={videoRef.current} />
        </div>
        <div className="lg:col-span-2">
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
              Could not find a playlist for "{currentEmotion}". Try detecting your mood again.
            </p>
          )}
           {!isLoadingPlaylist && !playlist && !currentEmotion && (
            <p className="text-center text-gray-400">
              Detect your mood to get a personalized playlist.
            </p>
          )}
        </div>
      </div>
      <MusicPlayer track={currentTrack} onEnd={handleTrackEnd} />
    </div>
  );
};

export default MoodPage;
