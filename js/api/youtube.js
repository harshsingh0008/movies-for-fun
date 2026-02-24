// Simple YouTube URL generator - no API key needed

// Get YouTube search URL for a movie trailer
export function getMovieTrailerUrl(movieTitle, movieYear) {
    // Create YouTube search query
    const searchQuery = encodeURIComponent(`${movieTitle} ${movieYear} official trailer`);
    return `https://www.youtube.com/results?search_query=${searchQuery}`;
}

// For backward compatibility with existing code
export async function getMovieTrailer(movieTitle, movieYear) {
    return {
        link: getMovieTrailerUrl(movieTitle, movieYear),
        embedUrl: null,
        thumbnail: null
    };
}

// Open trailer in new tab
export function openTrailer(movieTitle, movieYear) {
    const url = getMovieTrailerUrl(movieTitle, movieYear);
    window.open(url, '_blank');
}

// Search for movie trailers (returns search URL)
export function searchMovieTrailer(movieTitle, movieYear) {
    return getMovieTrailerUrl(movieTitle, movieYear);
}

// Get multiple trailer search URLs for a movie (different keywords)
export function getTrailerOptions(movieTitle, movieYear) {
    const baseTitle = encodeURIComponent(`${movieTitle} ${movieYear}`);
    
    return {
        official: `https://www.youtube.com/results?search_query=${baseTitle}+official+trailer`,
        teaser: `https://www.youtube.com/results?search_query=${baseTitle}+teaser`,
        clip: `https://www.youtube.com/results?search_query=${baseTitle}+clip`,
        scene: `https://www.youtube.com/results?search_query=${baseTitle}+scene`
    };
}

// Simple function to check if YouTube is accessible (always returns true for redirect)
export function isYouTubeAvailable() {
    return true; // We're just redirecting, so it's always available
}

// Export default object with all functions
export default {
    getMovieTrailerUrl,
    getMovieTrailer,
    openTrailer,
    searchMovieTrailer,
    getTrailerOptions,
    isYouTubeAvailable
};