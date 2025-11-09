import React, { useState, useEffect, useRef } from 'react';
import { useSpotifyAuth } from '../hooks/useSpotifyAuth';
import { getPlaylistForEmotion } from '../services/spotifyService';
import type { SpotifyPlaylist } from '../types';
import Playlist from './Playlist';
import Button from './ui/Button';

interface MusicPlayerProps {
  emotion: string | null;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ emotion }) => {
  const { token, login } = useSpotifyAuth();
  const [playlist, setPlaylist] = useState<SpotifyPlaylist | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPlayingUri, setCurrentPlayingUri] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (emotion && token) {
      setIsLoading(true);
      setError(null);
      setPlaylist(null);
      getPlaylistForEmotion(emotion, token)
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
  }, [emotion, token]);
  
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

  if (!token) {
    return (
      <div className="text-center">
        <h2 className="text-xl font-semibold text-white mb-4">Music Recommendations</h2>
        <p className="text-gray-400 mb-4">Connect your Spotify account to get playlists based on your mood.</p>
        <Button onClick={login}>Connect to Spotify</Button>
      </div>
    );
  }

  if (!emotion) {
    return <p className="text-gray-400 text-center">Detect your emotion to get a playlist recommendation.</p>;
  }

  if (isLoading) {
    return <p className="text-gray-400 text-center">Finding a playlist for you...</p>;
  }

  if (error) {
    return <p className="text-red-400 text-center">{error}</p>;
  }

  return (
    <div>
       <audio ref={audioRef} />
       <Playlist playlist={playlist} onPlay={handlePlay} currentPlayingUri={currentPlayingUri} />
    </div>
  );
};

export default MusicPlayer;
