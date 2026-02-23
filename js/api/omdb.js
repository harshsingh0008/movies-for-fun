import { API_CONFIG, MOCK_MOVIES } from '../utils/constants.js';

const BASE_URL = API_CONFIG.omdb.baseUrl;
const API_KEY = API_CONFIG.omdb.key;

// Test if API key is working
console.log('OMDb API Key:', API_KEY ? '✅ Present' : '❌ Missing');

// Get movie details by title
export async function getMovieByTitle(title) {
    console.log('Fetching movie:', title);
    
    try {
        const url = `${BASE_URL}?apikey=${API_KEY}&t=${encodeURIComponent(title)}&plot=full`;
        console.log('Request URL:', url.replace(API_KEY, 'HIDDEN'));
        
        const response = await fetch(url);
        console.log('Response status:', response.status);
        
        const data = await response.json();
        console.log('Response data:', data);
        
        if (data.Response === 'True') {
            console.log('Movie found:', data.Title);
            return data;
        } else {
            console.log('Movie not found:', data.Error);
            return null;
        }
    } catch (error) {
        console.error('Error fetching movie:', error);
        return null;
    }
}

// Get movie details by IMDb ID
export async function getMovieById(imdbId) {
    console.log('Fetching movie by ID:', imdbId);
    
    try {
        const url = `${BASE_URL}?apikey=${API_KEY}&i=${imdbId}&plot=full`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.Response === 'True') {
            console.log('Movie found by ID:', data.Title);
            return data;
        }
        console.log('Movie by ID not found:', imdbId);
        return null;
    } catch (error) {
        console.error('Error fetching movie by ID:', error);
        return null;
    }
}

// Get multiple movies by IDs
export async function getMoviesByIds(ids) {
    console.log('Fetching multiple movies:', ids);
    
    try {
        const movies = await Promise.all(
            ids.map(async (id) => {
                try {
                    return await getMovieById(id);
                } catch (e) {
                    console.error(`Failed to fetch movie ${id}:`, e);
                    return null;
                }
            })
        );
        const validMovies = movies.filter(m => m !== null);
        console.log(`Fetched ${validMovies.length} out of ${ids.length} movies`);
        return validMovies;
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    }
}

// Get trending movies (popular movies from recent years)
export async function getTrendingMovies() {
    console.log('Fetching trending movies...');
    
    try {
        // Popular movies from 2022-2024 with their IMDb IDs
        const popularMovieIds = [
            'tt15398776', // Oppenheimer (2023)
            'tt15239678', // Dune: Part Two (2024)
            'tt1517268',  // Barbie (2023)
            'tt9362722',  // Spider-Man: Across the Spider-Verse (2023)
            'tt1745960',  // Top Gun: Maverick (2022)
            'tt9032400',  // John Wick: Chapter 4 (2023)
            'tt5090568',  // Killers of the Flower Moon (2023)
            'tt21263535', // Poor Things (2023)
            'tt12584954', // Mission: Impossible - Dead Reckoning (2023)
            'tt16426418', // Gladiator 2 (2024)
            'tt14824590', // Furiosa (2024)
            'tt27593645', // The Iron Claw (2023)
            'tt14539740', // Anyone But You (2023)
            'tt9603212',  // Mission: Impossible 8 (2024)
            'tt15239676', // Godzilla x Kong: The New Empire (2024)
            'tt13238346', // The Fall Guy (2024)
            'tt14885854', // Argylle (2024)
            'tt17981846', // Madame Web (2024)
            'tt14230458', // Bob Marley: One Love (2024)
            'tt10638522'  // The Beekeeper (2024)
        ];
        
        // Get first 6 movies
        const movies = await getMoviesByIds(popularMovieIds.slice(0, 6));
        
        if (movies.length > 0) {
            console.log(`Found ${movies.length} popular movies`);
            return movies;
        }
        
        // Fallback to enhanced mock data
        console.log('Falling back to mock trending movies');
        return getEnhancedMockTrending();
        
    } catch (error) {
        console.error('Error fetching trending:', error);
        return getEnhancedMockTrending();
    }
}

// Get top rated movies of all time
export async function getTopRatedMovies() {
    console.log('Fetching top rated movies...');
    
    try {
        // IMDb Top 250 IDs (top rated movies)
        const topRatedIds = [
            'tt0111161', // The Shawshank Redemption (1994)
            'tt0068646', // The Godfather (1972)
            'tt0468569', // The Dark Knight (2008)
            'tt0071562', // The Godfather Part II (1974)
            'tt0050083', // 12 Angry Men (1957)
            'tt0108052', // Schindler's List (1993)
            'tt0167260', // The Lord of the Rings: The Return of the King (2003)
            'tt0110912', // Pulp Fiction (1994)
            'tt0060196', // The Good, the Bad and the Ugly (1966)
            'tt0137523', // Fight Club (1999)
            'tt0109830', // Forrest Gump (1994)
            'tt1375666', // Inception (2010)
            'tt0133093', // The Matrix (1999)
            'tt0099685', // Goodfellas (1990)
            'tt0073486', // One Flew Over the Cuckoo's Nest (1975)
            'tt0047478', // Seven Samurai (1954)
            'tt0102926', // The Silence of the Lambs (1991)
            'tt0120737', // The Lord of the Rings: The Fellowship of the Ring (2001)
            'tt0317248', // City of God (2002)
            'tt0118799'  // Life Is Beautiful (1997)
        ];
        
        // Get first 6 movies
        const movies = await getMoviesByIds(topRatedIds.slice(0, 6));
        
        if (movies.length > 0) {
            console.log(`Found ${movies.length} top rated movies`);
            return movies;
        }
        
        // Fallback to mock data
        console.log('Falling back to mock top rated movies');
        return MOCK_MOVIES.topRated;
        
    } catch (error) {
        console.error('Error fetching top rated:', error);
        return MOCK_MOVIES.topRated;
    }
}

// Search for movies (for suggestions)
export async function searchMovies(searchTerm) {
    console.log('Searching movies with term:', searchTerm);
    
    try {
        const url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.Response === 'True') {
            console.log(`Found ${data.Search?.length || 0} results`);
            return data.Search || [];
        }
        console.log('No results found:', data.Error);
        return [];
    } catch (error) {
        console.error('Error searching movies:', error);
        return [];
    }
}

// Enhanced mock trending data with real movie titles
function getEnhancedMockTrending() {
    return [
        {
            imdbID: 'tt15398776',
            Title: 'Oppenheimer',
            Year: '2023',
            Poster: 'N/A',
            imdbRating: '8.4',
            Genre: 'Biography, Drama, History',
            Director: 'Christopher Nolan',
            Actors: 'Cillian Murphy, Emily Blunt, Matt Damon'
        },
        {
            imdbID: 'tt15239678',
            Title: 'Dune: Part Two',
            Year: '2024',
            Poster: 'N/A',
            imdbRating: '8.9',
            Genre: 'Action, Adventure, Drama',
            Director: 'Denis Villeneuve',
            Actors: 'Timothée Chalamet, Zendaya, Rebecca Ferguson'
        },
        {
            imdbID: 'tt1517268',
            Title: 'Barbie',
            Year: '2023',
            Poster: 'N/A',
            imdbRating: '7.0',
            Genre: 'Adventure, Comedy, Fantasy',
            Director: 'Greta Gerwig',
            Actors: 'Margot Robbie, Ryan Gosling, Issa Rae'
        },
        {
            imdbID: 'tt9362722',
            Title: 'Spider-Man: Across the Spider-Verse',
            Year: '2023',
            Poster: 'N/A',
            imdbRating: '8.7',
            Genre: 'Animation, Action, Adventure',
            Director: 'Joaquim Dos Santos, Kemp Powers, Justin K. Thompson',
            Actors: 'Shameik Moore, Hailee Steinfeld, Brian Tyree Henry'
        },
        {
            imdbID: 'tt1745960',
            Title: 'Top Gun: Maverick',
            Year: '2022',
            Poster: 'N/A',
            imdbRating: '8.3',
            Genre: 'Action, Drama',
            Director: 'Joseph Kosinski',
            Actors: 'Tom Cruise, Jennifer Connelly, Miles Teller'
        },
        {
            imdbID: 'tt9032400',
            Title: 'John Wick: Chapter 4',
            Year: '2023',
            Poster: 'N/A',
            imdbRating: '8.0',
            Genre: 'Action, Crime, Thriller',
            Director: 'Chad Stahelski',
            Actors: 'Keanu Reeves, Donnie Yen, Bill Skarsgård'
        }
    ];
}

// Test function to verify API is working
export async function testOMDbAPI() {
    console.log('Testing OMDb API connection...');
    
    try {
        const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=batman`);
        const data = await response.json();
        
        if (data.Response === 'True') {
            console.log('✅ OMDb API is working!');
            console.log(`Found ${data.Search?.length || 0} results for "batman"`);
            return true;
        } else {
            console.error('❌ OMDb API returned error:', data.Error);
            return false;
        }
    } catch (error) {
        console.error('❌ OMDb API test failed:', error);
        return false;
    }
}