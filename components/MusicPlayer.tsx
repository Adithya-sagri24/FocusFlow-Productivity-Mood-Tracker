import React, { useState, useEffect, useRef } from 'react';
import { useSpotifyAuth } from '../hooks/useSpotifyAuth';
import { getPlaylistForEmotion } from '../services/spotifyService';
import type { SpotifyPlaylist } from '../types';
import Playlist from './Playlist';
import Button from './ui/Button';
import Card from './ui/Card';
import { emotionToGenreMap } from '../lib/emotionMapping';

const moods = Object.keys(emotionToGenreMap);

const MusicPlayer: React.FC = () => {
  const { token, login } = useSpotifyAuth();
  const [playlist, setPlaylist] = useState<SpotifyPlaylist | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [currentPlayingUri, setCurrentPlayingUri] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (selectedEmotion && token) {
      setIsLoading(true);
      setError(null);
      setPlaylist(null);
      getPlaylistForEmotion(selectedEmotion, token)
        .then(data => {
          if (data) {
            setPlaylist(data);
          } else {
            setError('Could not find a suitable playlist.');
          }
        })
        .catch(() => setError('Failed to fetch playlist.'))
        .finally(() => setIsLoading(false));
    }
  }, [selectedEmotion, token]);
  
  const handlePlay = (trackUri: string) => {
    const track = playlist?.tracks.items.find(item => item.track.uri === trackUri)?.track;
    if (track?.preview_url) {
      if (audioRef.current) {
        if (currentPlayingUri === trackUri) {
          audioRef.current.pause();
          setCurrentPlayingUri(null);
        } else {
          audioRef.current.src = track.preview_url;
          audioRef.current.play();
          setCurrentPlayingUri(trackUri);
        }
      }
    }
  };
  
  useEffect(() => {
    const audioEl = audioRef.current;
    if (audioEl) {
        const onEnded = () => setCurrentPlayingUri(null);
        audioEl.addEventListener('ended', onEnded);
        return () => {
            audioEl.removeEventListener('ended', onEnded);
        };
    }
  }, []);

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  if (!token) {
    return (
      <Card>
        <div className="p-6 text-center">
          <h2 className="text-xl font-semibold text-white mb-4">Music Recommendations</h2>
          <p className="text-gray-400 mb-4">Connect your Spotify account to get playlists based on your mood.</p>
          <Button onClick={login}>Connect to Spotify</Button>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-white mb-4">What's the vibe?</h2>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {moods.map(mood => (
            <Button 
              key={mood}
              variant={selectedEmotion === mood ? 'primary' : 'secondary'}
              onClick={() => setSelectedEmotion(mood)}
              className="text-xs"
            >
              {capitalize(mood)}
            </Button>
          ))}
        </div>
        
        {isLoading && <p className="text-gray-400 text-center">Finding a playlist for you...</p>}
        {error && <p className="text-red-400 text-center">{error}</p>}
        
        <div className="mt-4">
          <audio ref={audioRef} />
          <Playlist playlist={playlist} onPlay={handlePlay} currentPlayingUri={currentPlayingUri} />
        </div>
      </div>
    </Card>
  );
};

export default MusicPlayer;
