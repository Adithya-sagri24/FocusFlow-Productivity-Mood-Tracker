// Fix: Implemented missing type definitions used throughout the application.
import type { Session as SupabaseSession } from '@supabase/supabase-js';

export type Session = SupabaseSession;

export type Page = 'Dashboard' | 'Tasks' | 'Schedule' | 'Analytics' | 'Mood' | 'Settings' | 'Privacy';

export interface Task {
  id: number;
  user_id: string;
  title: string;
  is_completed: boolean;
  inserted_at: string;
}

// Based on Spotify API documentation
export interface SpotifyToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  refresh_token: string;
  created_at?: number;
}

export interface SpotifyImage {
  url: string;
  height: number | null;
  width: number | null;
}

export interface SpotifyArtist {
  name: string;
  id: string;
  uri: string;
}

export interface SpotifyAlbum {
  id: string;
  name: string;
  images: SpotifyImage[];
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
  uri: string;
  preview_url: string | null;
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  images: SpotifyImage[];
  tracks: {
    items: { track: SpotifyTrack | null }[];
  };
}
