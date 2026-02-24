// Simple YouTube redirect - no embed, just open in new tab

// Show trailer by opening YouTube search in new tab
export function showTrailerModal(movieTitle, movieYear) {
    // Create YouTube search query
    const searchQuery = encodeURIComponent(`${movieTitle} ${movieYear} official trailer`);
    const youtubeUrl = `https://www.youtube.com/results?search_query=${searchQuery}`;
    
    // Open in new tab
    window.open(youtubeUrl, '_blank');
    
    console.log(`Opening trailer for: ${movieTitle} (${movieYear})`);
}

// Get YouTube search link (useful for <a> tags)
export function getTrailerLink(movieTitle, movieYear) {
    const searchQuery = encodeURIComponent(`${movieTitle} ${movieYear} official trailer`);
    return `https://www.youtube.com/results?search_query=${searchQuery}`;
}

// Alternative: If you want to keep the modal but with a link
export function showTrailerLink(movieTitle, movieYear) {
    return getTrailerLink(movieTitle, movieYear);
}

// Get YouTube search URL
export function getYouTubeSearchUrl(movieTitle, movieYear) {
    return getTrailerLink(movieTitle, movieYear);
}

// Open multiple trailer options (official, teaser, etc.)
export function showTrailerOptions(movieTitle, movieYear) {
    const baseTitle = encodeURIComponent(`${movieTitle} ${movieYear}`);
    
    const options = {
        official: `https://www.youtube.com/results?search_query=${baseTitle}+official+trailer`,
        teaser: `https://www.youtube.com/results?search_query=${baseTitle}+teaser`,
        clip: `https://www.youtube.com/results?search_query=${baseTitle}+clip`
    };
    
    // Open official trailer by default
    window.open(options.official, '_blank');
    
    // Log all options for debugging
    console.log('Trailer options:', options);
    
    return options;
}

// For backward compatibility with any code still using the old modal
export function setupTrailerModal() {
    console.log('Trailer modal disabled - using redirects instead');
    // No setup needed - we're using redirects
}

// Export all functions as default
export default {
    showTrailerModal,
    getTrailerLink,
    showTrailerLink,
    getYouTubeSearchUrl,
    showTrailerOptions,
    setupTrailerModal
};