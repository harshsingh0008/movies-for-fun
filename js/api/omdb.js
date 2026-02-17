import { API_CONFIG, MOCK_MOVIES } from '../utils/constants.js';

const BASE_URL = API_CONFIG.omdb.baseUrl;
const API_KEY = API_CONFIG.omdb.key;

// Get movie details by title
export async function getMovieByTitle(title) {
    try {
        const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&t=${encodeURIComponent(title)}&plot=full`);
        const data = await response.json();
        
        if (data.Response === 'True') {
            return data;
        }
        return null;
    } catch (error) {
        console.error('Error fetching movie:', error);
        return null;
    }
}

// Get movie details by IMDb ID
export async function getMovieById(imdbId) {
    try {
        const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${imdbId}&plot=full`);
        const data = await response.json();
        
        if (data.Response === 'True') {
            return data;
        }
        return null;
    } catch (error) {
        console.error('Error fetching movie by ID:', error);
        return null;
    }
}

// Get multiple movies by IDs
export async function getMoviesByIds(ids) {
    try {
        const movies = await Promise.all(
            ids.map(id => getMovieById(id))
        );
        return movies.filter(m => m !== null);
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    }
}

// Get trending movies
export async function getTrendingMovies() {
    try {
        const movies = await getMoviesByIds(
            MOCK_MOVIES.trending.map(m => m.imdbID)
        );
        return movies.length ? movies : MOCK_MOVIES.trending;
    } catch {
        return MOCK_MOVIES.trending;
    }
}

// Get top rated movies
export async function getTopRatedMovies() {
    try {
        const movies = await getMoviesByIds(
            MOCK_MOVIES.topRated.map(m => m.imdbID)
        );
        return movies.length ? movies : MOCK_MOVIES.topRated;
    } catch {
        return MOCK_MOVIES.topRated;
    }
}

