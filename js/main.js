import { getMovieByTitle } from './api/omdb.js';
import { getMovieRecommendations } from './api/deepseek.js';
import { renderMovie, showLoadingState, showErrorMessage, renderHomeSections, renderRecommendations } from './ui/render.js';
import { toggleTheme, loadSavedTheme, initTheme } from './theme/theme.js';
import { setupModal } from './components/movieModal.js';
import { setupSearchSuggestions } from './components/searchSuggestions.js';
import { renderWatchlistPage, getWatchlist, updateWatchlistBadge } from './services/watchlist.js';
import { showTrailerModal } from './components/trailerPlayer.js';

// DOM Elements
const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-btn');
const themeToggle = document.querySelector('#theme-toggle');
const movieContainer = document.querySelector('#movie-container');
const homeSections = document.querySelector('#home-sections');
const recommendationsSection = document.querySelector('#recommendations-section');
const homeLink = document.querySelector('#home-link');
const watchlistLink = document.querySelector('#watchlist-link');

// State
let currentMovie = null;

// Initialize app
async function init() {
    console.log('App initializing...');
    
    // Check if DOM elements are found
    console.log('DOM Elements found:', {
        searchInput: !!searchInput,
        searchButton: !!searchButton,
        themeToggle: !!themeToggle,
        movieContainer: !!movieContainer,
        homeSections: !!homeSections,
        recommendationsSection: !!recommendationsSection,
        homeLink: !!homeLink,
        watchlistLink: !!watchlistLink
    });
    
    // Initialize theme system (this attaches the event listener properly)
    initTheme();
    
    // Setup modal
    setupModal();
    
    // Setup search suggestions (only if searchInput exists)
    if (searchInput) {
        setupSearchSuggestions(searchInput, handleSuggestionClick);
    } else {
        console.error('Search input not found!');
    }
    
    // Load homepage sections
    await loadHomePage();
    
    // Update watchlist badge
    updateWatchlistBadge();
    
    // Setup event listeners (except theme toggle which is handled by initTheme)
    setupEventListeners();
    
    console.log('App initialized!');
}

// Setup all event listeners
function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Search button click
    if (searchButton) {
        searchButton.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Search button clicked');
            handleSearch();
        });
    } else {
        console.error('Search button not found!');
    }
    
    // Enter key in search input
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                console.log('Enter key pressed');
                handleSearch();
            }
        });
    }
    
    // Click on movie cards (delegation)
    document.addEventListener('click', handleMovieCardClick);
    
    // Navigation links
    if (homeLink) {
        homeLink.addEventListener('click', (e) => {
            e.preventDefault();
            navigateToHome();
        });
    }
    
    if (watchlistLink) {
        watchlistLink.addEventListener('click', (e) => {
            e.preventDefault();
            navigateToWatchlist();
        });
    }
    
    // Watchlist button clicks (delegation)
    document.addEventListener('click', handleWatchlistButtonClick);
    
    // NOTE: Trailer buttons are now <a> tags, so they work naturally
    // No need for a JavaScript handler - they open in new tab automatically
}

// Handle search
async function handleSearch() {
    console.log('handleSearch called');
    const title = searchInput.value.trim();
    console.log('Search title:', title);
    
    if (!title) {
        showErrorMessage('Please enter a movie title');
        return;
    }
    
    try {
        // Update active nav link
        setActiveNavLink('home');
        
        // Show loading
        showLoadingState(movieContainer);
        if (recommendationsSection) {
            recommendationsSection.style.display = 'none';
        }
        if (homeSections) {
            homeSections.style.display = 'block';
        }
        
        // Fetch movie
        console.log('Fetching movie:', title);
        const movieData = await getMovieByTitle(title);
        console.log('Movie data received:', movieData);
        
        if (!movieData) {
            showErrorMessage('Movie not found. Try another title.');
            return;
        }
        
        // Save current movie
        currentMovie = movieData;
        
        // Render movie
        renderMovie(movieData, movieContainer);
        
        // Get and render recommendations
        console.log('Getting recommendations...');
        const recommendations = await getMovieRecommendations(movieData);
        console.log('Recommendations:', recommendations);
        
        if (recommendationsSection) {
            renderRecommendations(recommendations, recommendationsSection);
        }
        
        // Scroll to movie
        movieContainer.scrollIntoView({ behavior: 'smooth' });
        
    } catch (error) {
        console.error('Error in handleSearch:', error);
        showErrorMessage(error.message);
    }
}

// Handle click on movie cards
function handleMovieCardClick(e) {
    const card = e.target.closest('.movie-card-small');
    if (!card) return;
    
    // Don't trigger if clicking on remove button
    if (e.target.closest('.remove-watchlist-btn')) return;
    
    const title = card.dataset.title;
    console.log('Movie card clicked:', title);
    
    if (title) {
        searchInput.value = title;
        handleSearch();
    }
}

// Handle watchlist button clicks
function handleWatchlistButtonClick(e) {
    const watchlistBtn = e.target.closest('.watchlist-btn');
    if (!watchlistBtn) return;
    
    e.stopPropagation();
    
    const movieData = {
        imdbID: watchlistBtn.dataset.imdbid,
        Title: watchlistBtn.dataset.title,
        Year: watchlistBtn.dataset.year,
        Poster: watchlistBtn.dataset.poster,
        imdbRating: watchlistBtn.dataset.rating
    };
    
    import('./services/watchlist.js').then(({ addToWatchlist, isInWatchlist, removeFromWatchlist }) => {
        if (isInWatchlist(movieData.imdbID)) {
            removeFromWatchlist(movieData.imdbID);
            watchlistBtn.innerHTML = '<i class="fa-regular fa-bookmark"></i> Save';
            watchlistBtn.style.background = 'var(--color-accent)';
        } else {
            addToWatchlist(movieData);
            watchlistBtn.innerHTML = '<i class="fa-solid fa-bookmark"></i> Saved';
            watchlistBtn.style.background = '#10b981';
        }
        updateWatchlistBadge();
    });
}

// Handle suggestion click from search
function handleSuggestionClick(title) {
    searchInput.value = title;
    handleSearch();
}

// Navigate to home page
function navigateToHome() {
    console.log('Navigating to home');
    setActiveNavLink('home');
    
    if (homeSections) {
        homeSections.style.display = 'block';
    }
    
    if (movieContainer) {
        movieContainer.innerHTML = `
            <div class="welcome-message">
                <h2>✨ Welcome to MovieExplorer</h2>
                <p>Search for a movie or browse our curated sections below</p>
            </div>
        `;
    }
    
    if (recommendationsSection) {
        recommendationsSection.style.display = 'none';
    }
}

// Navigate to watchlist page
function navigateToWatchlist() {
    console.log('Navigating to watchlist');
    setActiveNavLink('watchlist');
    
    if (homeSections) {
        homeSections.style.display = 'none';
    }
    
    if (recommendationsSection) {
        recommendationsSection.style.display = 'none';
    }
    
    renderWatchlistPage();
}

// Set active navigation link
function setActiveNavLink(active) {
    if (homeLink) {
        homeLink.classList.remove('active');
    }
    if (watchlistLink) {
        watchlistLink.classList.remove('active');
    }
    
    if (active === 'home' && homeLink) {
        homeLink.classList.add('active');
    } else if (active === 'watchlist' && watchlistLink) {
        watchlistLink.classList.add('active');
    }
}

// Load homepage sections
async function loadHomePage() {
    console.log('Loading homepage sections...');
    try {
        const sectionsHtml = await renderHomeSections();
        console.log('Sections HTML:', sectionsHtml);
        
        if (homeSections) {
            homeSections.innerHTML = sectionsHtml;
        } else {
            console.error('homeSections element not found!');
        }
    } catch (error) {
        console.error('Error loading homepage:', error);
    }
}

// Start the app
document.addEventListener('DOMContentLoaded', init);