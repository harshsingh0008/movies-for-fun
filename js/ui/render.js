import { getTrendingMovies, getTopRatedMovies } from '../api/omdb.js';
import { HOME_SECTIONS } from '../utils/constants.js';
import { isInWatchlist } from '../services/watchlist.js';

// Render movie details - CENTERED
export function renderMovie(data, container) {
    const {
        Title,
        Year,
        Genre,
        Plot,
        Poster,
        imdbRating,
        Director,
        Actors,
        Runtime,
        imdbID
    } = data;

    const posterUrl = Poster && Poster !== "N/A" ? Poster : "https://via.placeholder.com/300x450?text=No+Image";
    
    // Check if movie is in watchlist
    const inWatchlist = isInWatchlist ? isInWatchlist(imdbID) : false;
    const watchlistIcon = inWatchlist ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark';
    const watchlistText = inWatchlist ? 'Saved' : 'Save';
    const watchlistColor = inWatchlist ? '#10b981' : 'var(--color-accent)';

    container.innerHTML = `
        <div class="movie-card" style="text-align: center;">
            <div class="movie-poster" style="display: flex; justify-content: center;">
                <img src="${posterUrl}" alt="${Title} Poster" style="margin: 0 auto;" />
            </div>
            <div class="movie-info" style="text-align: center;">
                <h2>${Title} <span>(${Year})</span></h2>
                <div class="rating" style="justify-content: center;">⭐ IMDb: ${imdbRating || 'N/A'}</div>
                <p><strong>Genre:</strong> ${Genre || 'N/A'}</p>
                <p><strong>Director:</strong> ${Director || 'N/A'}</p>
                <p><strong>Actors:</strong> ${Actors || 'N/A'}</p>
                <p><strong>Runtime:</strong> ${Runtime || 'N/A'}</p>
                <p class="plot" style="max-width: 600px; margin: 1rem auto;"><strong>Plot:</strong> ${Plot || 'No plot available.'}</p>
                <div style="display: flex; justify-content: center; gap: 1rem; margin-top: 1rem; flex-wrap: wrap;">
                    <button class="trailer-btn" data-title="${Title}" data-year="${Year}">
                        <i class="fa-brands fa-youtube"></i> Watch Trailer
                    </button>
                    <button class="watchlist-btn" 
                        data-imdbid="${imdbID}" 
                        data-title="${Title}" 
                        data-year="${Year}" 
                        data-poster="${Poster}" 
                        data-rating="${imdbRating || ''}"
                        style="background: ${watchlistColor};">
                        <i class="${watchlistIcon}"></i> ${watchlistText}
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Render homepage sections - CENTERED TITLES
export async function renderHomeSections() {
    console.log('renderHomeSections called');
    
    try {
        // Fetch section data
        console.log('Fetching trending and top rated...');
        const [trending, topRated] = await Promise.all([
            getTrendingMovies(),
            getTopRatedMovies()
        ]);
        
        console.log('Trending movies:', trending);
        console.log('Top rated movies:', topRated);

        const sections = [
            { ...HOME_SECTIONS[0], movies: trending },
            { ...HOME_SECTIONS[1], movies: topRated }
        ];

        let html = '';
        
        sections.forEach(section => {
            if (section.movies && section.movies.length > 0) {
                html += `
                    <div class="section-title" style="text-align: center; justify-content: center;">
                        <i class="${section.icon}"></i>
                        <h2>${section.title}</h2>
                    </div>
                    <div class="movies-grid" id="${section.id}-grid" style="justify-content: center;">
                        ${renderMovieCards(section.movies)}
                    </div>
                `;
            }
        });

        console.log('Generated HTML length:', html.length);
        return html || '<p style="text-align: center;">No movies to display.</p>';
        
    } catch (error) {
        console.error('Error rendering home sections:', error);
        return '<p style="text-align: center;">Error loading movies. Please refresh the page.</p>';
    }
}

// Render movie cards for grid
function renderMovieCards(movies) {
    return movies.map(movie => {
        const poster = movie.Poster && movie.Poster !== "N/A" 
            ? movie.Poster 
            : "https://via.placeholder.com/200x300?text=No+Image";
        
        const rating = movie.imdbRating && movie.imdbRating !== "N/A" 
            ? `⭐ ${movie.imdbRating}` 
            : '';
        
        return `
            <div class="movie-card-small" data-title="${movie.Title}" data-imdbid="${movie.imdbID || ''}">
                <img src="${poster}" alt="${movie.Title}" loading="lazy" style="margin: 0 auto;">
                <div class="movie-info">
                    <h4>${movie.Title}</h4>
                    <div class="year">${movie.Year}</div>
                    ${rating ? `<div class="rating">${rating}</div>` : ''}
                </div>
            </div>
        `;
    }).join('');
}

// Render recommendations - CENTERED
export function renderRecommendations(recommendations, container) {
    if (!recommendations || recommendations.length === 0) {
        container.style.display = 'none';
        return;
    }

    container.innerHTML = `
        <div class="recommendations-title" style="text-align: center; justify-content: center;">
            <i class="fa-solid fa-robot"></i>
            <h2>AI-Powered Recommendations</h2>
        </div>
        <div class="recommendations-grid" style="justify-content: center;">
            ${recommendations.map(rec => `
                <div class="recommendation-card movie-card-small" data-title="${rec.title}" style="text-align: center;">
                    <img src="https://via.placeholder.com/200x300?text=${rec.title.replace(/ /g, '+')}" alt="${rec.title}" style="margin: 0 auto;">
                    <div class="movie-info">
                        <h4>${rec.title}</h4>
                        <div class="year">${rec.year}</div>
                        <div class="recommendation-tooltip" style="left: 50%; transform: translateX(-50%);">
                            <strong>${rec.mood || 'Recommended'}</strong>
                            <p>${rec.reason || 'Similar movie you might enjoy'}</p>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    container.style.display = 'block';
}

// Show loading state - CENTERED
export function showLoadingState(container) {
    container.innerHTML = `
        <div class="loading-card" style="text-align: center; padding: 2rem;">
            <div class="loader" style="margin: 0 auto;"></div>
            <p style="margin-top: 1rem;">Searching for your movie...</p>
        </div>
    `;
}

// Show error message - CENTERED
export function showErrorMessage(message) {
    const container = document.querySelector('#movie-container');
    if (!container) {
        console.error('Movie container not found for error message');
        return;
    }
    
    container.innerHTML = `
        <div class="error-card" style="text-align: center; padding: 2rem;">
            <h3>⚠️ Oops!</h3>
            <p style="margin: 1rem 0;">${message}</p>
            <div style="display: flex; justify-content: center;">
                <button onclick="location.reload()" class="btn-primary">Try Again</button>
            </div>
        </div>
    `;
}

// Show loading skeleton for sections
export function showSectionSkeleton() {
    return `
        <div class="movies-grid">
            ${Array(6).fill(0).map(() => `
                <div class="skeleton-card">
                    <div class="skeleton-image"></div>
                    <div class="movie-info">
                        <div class="skeleton-text"></div>
                        <div class="skeleton-text"></div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}