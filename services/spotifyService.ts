import type { SpotifyPlaylist, SpotifyToken } from '../types';
import { emotionToGenreMap } from '../lib/emotionMapping';

const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';

export const getPlaylistForEmotion = async (emotion: string, token: SpotifyToken | null): Promise<SpotifyPlaylist | null> => {
  const accessToken = token?.access_token;
  if (!accessToken) {
    console.error('No Spotify access token available.');
    return null;
  }
  
  try {
    // 1. Search for a playlist matching the emotion
    const searchResponse = await fetch(`${SPOTIFY_API_BASE}/search?q=${emotion}%20mood&type=playlist&limit=1`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!searchResponse.ok) throw new Error('Failed to search for playlists');
    const searchData = await searchResponse.json();
    
    const playlistId = searchData.playlists?.items[0]?.id;
    if (!playlistId) {
        console.log(`No playlist found for emotion: ${emotion}. Trying genre search.`);
        const genreSeed = emotionToGenreMap[emotion.toLowerCase()] || emotionToGenreMap['neutral'];
        return getPlaylistForGenre(genreSeed, accessToken);
    }

    // 2. Get the full playlist details
    const playlistResponse = await fetch(`${SPOTIFY_API_BASE}/playlists/${playlistId}`, {
         headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    if (!playlistResponse.ok) throw new Error('Failed to fetch playlist details');
    
    const playlistData = await playlistResponse.json();
    return playlistData;

  } catch (error) {
    console.error('Error fetching playlist for emotion:', error);
    return null;
  }
};


const getPlaylistForGenre = async (genreSeed: string, accessToken: string): Promise<SpotifyPlaylist | null> => {
    try {
        const recommendationsResponse = await fetch(`${SPOTIFY_API_BASE}/recommendations?seed_genres=${genreSeed}&limit=20`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        if (!recommendationsResponse.ok) throw new Error('Failed to fetch recommendations');
        
        const recommendationsData = await recommendationsResponse.json();
        
        if (!recommendationsData.tracks || recommendationsData.tracks.length === 0) {
            return null;
        }

        const playlist: SpotifyPlaylist = {
            id: `genre-${genreSeed}`,
            name: `${genreSeed.charAt(0).toUpperCase() + genreSeed.slice(1).replace(/,/g, ', ')} Recommendations`,
            images: [],
            tracks: {
                items: recommendationsData.tracks.map((track: any) => ({ track }))
            }
        };

        if (playlist.tracks.items[0]?.track?.album?.images[0]) {
            playlist.images.push(playlist.tracks.items[0].track.album.images[0]);
        }
        
        return playlist;

    } catch(error) {
        console.error('Error fetching playlist for genre:', error);
        return null;
    }
}
