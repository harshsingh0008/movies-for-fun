const WATCHLIST_KEY = 'movie-watchlist';

// Get watchlist from localStorage
export function getWatchlist() {
    const watchlist = localStorage.getItem(WATCHLIST_KEY);
    return watchlist ? JSON.parse(watchlist) : [];
}

// Add movie to watchlist
export function addToWatchlist(movie) {
    const watchlist = getWatchlist();
    
    // Check if already in watchlist
    const exists = watchlist.some(m => m.imdbID === movie.imdbID);
    
    if (!exists) {
        const movieSummary = {
            imdbID: movie.imdbID,
            Title: movie.Title,
            Year: movie.Year,
            Poster: movie.Poster,
            imdbRating: movie.imdbRating,
            addedAt: new Date().toISOString()
        };
        
        watchlist.push(movieSummary);
        localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
        return true;
    }
    return false;
}

// Remove from watchlist
export function removeFromWatchlist(imdbID) {
    let watchlist = getWatchlist();
    watchlist = watchlist.filter(m => m.imdbID !== imdbID);
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
}

// Check if movie is in watchlist
export function isInWatchlist(imdbID) {
    const watchlist = getWatchlist();
    return watchlist.some(m => m.imdbID === imdbID);
}

// Render watchlist page
export function renderWatchlistPage() {
    const watchlist = getWatchlist();
    const container = document.querySelector('#movie-container');
    const homeSections = document.querySelector('#home-sections');
    const recommendationsSection = document.querySelector('#recommendations-section');
    
    // Hide other sections
    homeSections.style.display = 'none';
    recommendationsSection.style.display = 'none';
    
    if (watchlist.length === 0) {
        container.innerHTML = `
            <div class="empty-watchlist" style="text-align: center; padding: 3rem;">
                <i class="fa-solid fa-bookmark" style="font-size: 4rem; color: var(--text-muted);"></i>
                <h2>Your Watchlist is Empty</h2>
                <p>Save movies to watch later by clicking the bookmark icon!</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = `
        <div style="text-align: center; margin-bottom: 2rem;">
            <h2><i class="fa-solid fa-bookmark"></i> My Watchlist</h2>
            <p>${watchlist.length} movie${watchlist.length > 1 ? 's' : ''} saved</p>
        </div>
        <div class="movies-grid">
            ${watchlist.map(movie => `
                <div class="movie-card-small watchlist-item" data-title="${movie.Title}">
                    <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Image'}" alt="${movie.Title}">
                    <div class="movie-info">
                        <h4>${movie.Title}</h4>
                        <div class="year">${movie.Year}</div>
                        ${movie.imdbRating ? `<div class="rating">⭐ ${movie.imdbRating}</div>` : ''}
                        <button class="remove-watchlist-btn" data-id="${movie.imdbID}" style="background: #dc2626; margin-top: 0.5rem;">
                            <i class="fa-solid fa-trash"></i> Remove
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    // Add remove buttons functionality
    document.querySelectorAll('.remove-watchlist-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = btn.dataset.id;
            removeFromWatchlist(id);
            renderWatchlistPage(); // Refresh the page
        });
    });
} 
// Update watchlist badge count
export function updateWatchlistBadge() {
    const watchlist = getWatchlist();
    const badge = document.querySelector('#watchlist-count');
    if (badge) {
        badge.textContent = watchlist.length;
        badge.style.display = watchlist.length > 0 ? 'inline-block' : 'none';
    }
}

// Call this after any watchlist modification
// Add to addToWatchlist and removeFromWatchlist functions