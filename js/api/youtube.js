// Get trailer link for a movie
export async function getMovieTrailer(movieTitle, movieYear) {
    // Create YouTube search link
    const searchQuery = encodeURIComponent(`${movieTitle} ${movieYear} official trailer`);
    const trailerLink = `https://www.youtube.com/results?search_query=${searchQuery}`;
    
    return {
        link: trailerLink,
        embedUrl: null,
        thumbnail: null
    };
}