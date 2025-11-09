// Fix: Implemented the missing Mood page.
import React, { useState, useCallback } from 'react';
import EmotionDetector from '../components/EmotionDetector';
import Playlist from '../components/Playlist';
import MusicPlayer from '../components/MusicPlayer';
import Button from '../components/ui/Button';
import { useSpotifyAuth } from '../hooks/useSpotifyAuth';
import { getPlaylistForEmotion } from '../services/spotifyService';
import type { SpotifyPlaylist, SpotifyTrack } from '../types';

const MoodPage: React.FC = () => {
  const { token, login } = useSpotifyAuth();
  const [playlist, setPlaylist] = useState<SpotifyPlaylist | null>(null);
  const [loadingPlaylist, setLoadingPlaylist] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null);

  const handleEmotionDetected = useCallback(async (emotion: string) => {
    if (!token) return;
    setLoadingPlaylist(true);
    setError(null);
    setPlaylist(null);
    try {
      const fetchedPlaylist = await getPlaylistForEmotion(emotion, token);
      if (fetchedPlaylist) {
        setPlaylist(fetchedPlaylist);
      } else {
        setError(`Could not find a playlist for the mood: ${emotion}`);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoadingPlaylist(false);
    }
  }, [token]);

  const handlePlay = (trackUri: string) => {
    const trackToPlay = playlist?.tracks.items.find(item => item.track?.uri === trackUri)?.track;

    if (trackToPlay?.preview_url) {
        if (currentTrack?.uri === trackToPlay.uri) {
            setCurrentTrack(null); // Toggle off
        } else {
            setCurrentTrack(trackToPlay);
        }
    } else if(trackToPlay) {
        alert("This track doesn't have a preview available.");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Mood Music</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <EmotionDetector onEmotionDetected={handleEmotionDetected} />
        </div>
        <div>
          {!token ? (
            <div className="flex flex-col items-center justify-center h-full bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">Connect Spotify</h2>
              <p className="text-gray-400 mb-4 text-center">Connect your Spotify account to get music recommendations.</p>
              <Button onClick={login}>Login with Spotify</Button>
            </div>
          ) : (
            <div className="bg-gray-800 rounded-lg p-6 min-h-[300px]">
              {loadingPlaylist && <p className="text-center text-gray-400">Finding your vibe...</p>}
              {error && <p className="text-red-400 text-center">{error}</p>}
              <Playlist 
                playlist={playlist} 
                onPlay={handlePlay}
                currentPlayingUri={currentTrack?.uri || null}
              />
            </div>
          )}
        </div>
      </div>
      <MusicPlayer 
        track={currentTrack}
        onEnd={() => setCurrentTrack(null)}
      />
    </div>
  );
};

export default MoodPage;
