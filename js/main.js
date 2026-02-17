import { getMovieByTitle } from './api/omdb.js';
import { getMovieRecommendations } from './api/deepseek.js';
import { renderMovie, showLoadingState, showErrorMessage, renderHomeSections, renderRecommendations } from './ui/render.js';
import { toggleTheme, loadSavedTheme } from './theme/theme.js';
import { setupModal } from './components/movieModal.js';  // Fixed: was movieModel.js

// DOM Elements
const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-btn');
const themeToggle = document.querySelector('#theme-toggle');
const movieContainer = document.querySelector('#movie-container');
const homeSections = document.querySelector('#home-sections');
const recommendationsSection = document.querySelector('#recommendations-section');

// State
let currentMovie = null;

// Initialize app
async function init() {
    console.log('App initializing...'); // Check if this appears in console
    
    // Load saved theme
    loadSavedTheme();
    
    // Setup event listeners
    setupEventListeners();
    
    // Setup modal
    setupModal();
    
    // Load homepage sections
    await loadHomePage();
    
    console.log('App initialized!');
}

// Setup all event listeners
function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Search button click
    searchButton.addEventListener('click', (e) => {
        console.log('Search button clicked');
        handleSearch();
    });
    
    // Enter key in search input
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            console.log('Enter key pressed');
            handleSearch();
        }
    });
    
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Click on movie cards (delegation)
    document.addEventListener('click', handleMovieCardClick);
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
        // Show loading
        showLoadingState(movieContainer);
        recommendationsSection.style.display = 'none';
        
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
        renderRecommendations(recommendations, recommendationsSection);
        
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
    
    const title = card.dataset.title;
    console.log('Movie card clicked:', title);
    
    if (title) {
        searchInput.value = title;
        handleSearch();
    }
}

// Load homepage sections
async function loadHomePage() {
    console.log('Loading homepage sections...');
    try {
        const sectionsHtml = await renderHomeSections();
        console.log('Sections HTML:', sectionsHtml);
        homeSections.innerHTML = sectionsHtml;
    } catch (error) {
        console.error('Error loading homepage:', error);
    }
}

// Start the app
document.addEventListener('DOMContentLoaded', init);