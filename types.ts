import type { Session } from '@supabase/supabase-js';

export interface Task {
  id: number;
  user_id: string;
  title: string;
  is_completed: boolean;
  inserted_at: string;
}

export interface SpotifyToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  created_at: number;
}

export interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

export interface SpotifyArtist {
  name: string;
}

export interface SpotifyAlbum {
  images: SpotifyImage[];
}

export interface SpotifyTrack {
  id: string;
  uri: string;
  name: string;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
  preview_url: string | null;
}

export interface SpotifyPlaylistTrack {
  track: SpotifyTrack;
}

export interface SpotifyPlaylist {
  id: string;
  name:string;
  images: SpotifyImage[];
  tracks: {
    items: SpotifyPlaylistTrack[];
  };
}

export type PomodoroMode = 'work' | 'shortBreak' | 'longBreak';

export type Page = 'dashboard' | 'tasks' | 'schedule' | 'analytics' | 'settings' | 'privacy';

export { Session };
