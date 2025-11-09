// Fix: Implemented the missing type definitions for the application.
import { Session } from '@supabase/supabase-js';

export type { Session };

export interface Task {
  id: number;
  user_id: string;
  title: string;
  is_completed: boolean;
  inserted_at: string;
}

export type Page = 'Home' | 'Tasks' | 'Schedule' | 'Analytics' | 'Mood' | 'Settings' | 'Privacy';

// Spotify Types
export interface SpotifyToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  refresh_token: string;
  created_at: number;
}

export interface SpotifyImage {
  url: string;
  height: number | null;
  width: number | null;
}

export interface SpotifyArtist {
  name: string;
  id: string;
}

export interface SpotifyAlbum {
  id: string;
  name: string;
  images: SpotifyImage[];
}

export interface SpotifyTrack {
  id: string;
  name: string;
  uri: string;
  preview_url: string | null;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  images: SpotifyImage[];
  tracks: {
    items: {
      track: SpotifyTrack | null;
    }[];
  };
}
