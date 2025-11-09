import React from 'react';
import type { SpotifyPlaylist } from '../types';
import SongCard from './SongCard';

interface PlaylistProps {
  playlist: SpotifyPlaylist | null;
  onPlay: (trackUri: string) => void;
  currentPlayingUri: string | null;
}

const Playlist: React.FC<PlaylistProps> = ({ playlist, onPlay, currentPlayingUri }) => {
  if (!playlist) {
    return <p className="text-gray-400 text-center">No playlist loaded.</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{playlist.name}</h2>
      <div className="space-y-3">
        {playlist.tracks.items.map(({ track }) => (
          track && <SongCard 
            key={track.id} 
            track={track} 
            onPlay={onPlay}
            isPlaying={currentPlayingUri === track.uri}
          />
        ))}
      </div>
    </div>
  );
};

export default Playlist;
