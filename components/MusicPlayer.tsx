// Fix: Implemented the missing MusicPlayer component.
import React, { useState, useEffect, useRef } from 'react';
import Card from './ui/Card';
import IconButton from './ui/IconButton';
import { PauseIcon, PlayIcon } from './icons';
import type { SpotifyTrack } from '../types';

interface MusicPlayerProps {
    track: SpotifyTrack | null;
    onEnd: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ track, onEnd }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (track?.preview_url && audioRef.current) {
            audioRef.current.src = track.preview_url;
            audioRef.current.play().then(() => setIsPlaying(true)).catch(err => {
                console.error("Audio playback failed:", err);
                setIsPlaying(false);
            });
        } else {
            setIsPlaying(false);
            if(audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = '';
            }
        }
    }, [track]);
    
    useEffect(() => {
        const audioEl = audioRef.current;
        const handleEnded = () => {
            setIsPlaying(false);
            onEnd();
        };
        audioEl?.addEventListener('ended', handleEnded);
        return () => {
            audioEl?.removeEventListener('ended', handleEnded);
        }
    }, [onEnd]);
    
    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(err => console.error("Audio playback failed:", err));
            }
            setIsPlaying(!isPlaying);
        }
    };
    
    if (!track) return null;

    const artistName = track.artists.map(a => a.name).join(', ');
    const albumArtUrl = track.album.images[0]?.url;

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <Card className="p-4 flex items-center gap-4 w-80 shadow-2xl">
                {albumArtUrl && <img src={albumArtUrl} alt={track.name} className="w-14 h-14 rounded-md" />}
                <div className="flex-grow overflow-hidden">
                    <p className="font-semibold text-white truncate">{track.name}</p>
                    <p className="text-sm text-gray-400 truncate">{artistName}</p>
                </div>
                <IconButton onClick={togglePlay}>
                    {isPlaying ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6" />}
                </IconButton>
                <audio ref={audioRef} />
            </Card>
        </div>
    );
};

export default MusicPlayer;
