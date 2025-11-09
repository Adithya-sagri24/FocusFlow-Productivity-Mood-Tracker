import React from 'react';
import type { SpotifyTrack } from '../types';
import Card from './ui/Card';

interface SongCardProps {
  track: SpotifyTrack;
  onPlay: (trackUri: string) => void;
  isPlaying: boolean;
}

const SongCard: React.FC<SongCardProps> = ({ track, onPlay, isPlaying }) => {
  const artistNames = track.artists.map(artist => artist.name).join(', ');
  const imageUrl = track.album.images[0]?.url;

  return (
    <Card className="p-4 flex items-center gap-4 transition-all duration-300 hover:bg-gray-700/80">
      {imageUrl && (
        <img src={imageUrl} alt={track.name} className="w-16 h-16 rounded-md object-cover" />
      )}
      <div className="flex-grow overflow-hidden">
        <p className="text-white font-semibold truncate">{track.name}</p>
        <p className="text-gray-400 text-sm truncate">{artistNames}</p>
      </div>
      {track.preview_url && (
         <button 
           onClick={() => onPlay(track.uri)}
           className={`p-2 rounded-full ${isPlaying ? 'bg-green-500' : 'bg-purple-600'} text-white text-xs px-3`}
         >
           {isPlaying ? 'Playing' : 'Preview'}
         </button>
      )}
    </Card>
  );
};

export default SongCard;
