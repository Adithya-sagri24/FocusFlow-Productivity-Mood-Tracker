export interface Task {
  id: number;
  user_id: string;
  title: string;
  is_completed: boolean;
  inserted_at: string;
}

export interface SpotifyArtist {
  name: string;
}

export interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

export interface SpotifyAlbum {
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

export interface SpotifyPlaylistTrack {
  track: SpotifyTrack;
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  images: SpotifyImage[];
  tracks: {
    items: SpotifyPlaylistTrack[];
  };
}

export interface SpotifyToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  created_at?: number; // to calculate expiry
}
