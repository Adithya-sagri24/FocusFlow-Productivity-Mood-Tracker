import { useState, useEffect, useCallback } from 'react';
import type { SpotifyToken } from '../types';

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = window.location.origin + window.location.pathname;
const SCOPES = 'user-read-private user-read-email playlist-read-private';

export const useSpotifyAuth = () => {
  const [token, setToken] = useState<SpotifyToken | null>(() => {
    try {
      const storedToken = localStorage.getItem('spotify_token');
      if (storedToken) {
        const parsedToken = JSON.parse(storedToken) as SpotifyToken;
        if (parsedToken.created_at && (Date.now() - parsedToken.created_at) / 1000 < parsedToken.expires_in) {
          return parsedToken;
        }
      }
    } catch (error) {
        console.error("Failed to parse spotify token from localStorage", error);
        localStorage.removeItem('spotify_token');
    }
    return null;
  });

  const login = () => {
    if (!CLIENT_ID) {
      alert("Spotify Client ID is not configured. Please set REACT_APP_SPOTIFY_CLIENT_ID in your environment.");
      return;
    }
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}`;
    window.location.href = authUrl;
  };

  const handleAuthCallback = useCallback(() => {
    if (window.location.hash) {
      const params = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = params.get('access_token');
      const expiresIn = params.get('expires_in');
      const tokenType = params.get('token_type');

      if (accessToken && expiresIn && tokenType) {
        const newToken: SpotifyToken = {
          access_token: accessToken,
          expires_in: parseInt(expiresIn, 10),
          token_type: tokenType,
          scope: params.get('scope') || '',
          refresh_token: '', // Implicit grant doesn't provide a refresh token
          created_at: Date.now(),
        };
        localStorage.setItem('spotify_token', JSON.stringify(newToken));
        setToken(newToken);
        // Clean the URL hash
        window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
      }
    }
  }, []);

  useEffect(() => {
    handleAuthCallback();
  }, [handleAuthCallback]);

  return { token, login };
};
