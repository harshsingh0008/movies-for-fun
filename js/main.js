/* ================================================= */
/*                    main.js                       */
/*                   CONTROLLER                     */
/* ================================================= */

/*
  Responsibilities:
  - Handle user interactions
  - Orchestrate data flow
  - Connect API layer to UI layer
  - Initialize theme system
*/

import { fetchMovieData } from './api.js';
import { renderMovie, showLoadingState, showErrorMessage } from './ui.js';
import { toggleTheme, loadSavedTheme } from './theme.js';

/* ================================================ */
/*               DOM REFERENCES                     */
/* ================================================ */

const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-btn');
const themeToggleButton = document.querySelector('#theme-toggle');

/* ================================================ */
/*             SEARCH FLOW CONTROLLER               */
/* ================================================ */

async function handleSearch() {
  const title = searchInput.value.trim();

  if (!title) {
    showErrorMessage('Please enter a movie title.');
    return;
  }

  try {
    showLoadingState();

    const movieData = await fetchMovieData(title);

    renderMovie(movieData);

  } catch (error) {
    showErrorMessage(error.message);
  }
}

/* ================================================ */
/*            EVENT LISTENERS SETUP                 */
/* ================================================ */

function initEventListeners() {

  // Search button click
  searchButton.addEventListener('click', handleSearch);

  // Enter key press
  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  });

  // Theme toggle
  if (themeToggleButton) {
    themeToggleButton.addEventListener('click', toggleTheme);
  }
}

/* ================================================ */
/*                APP INITIALIZATION                */
/* ================================================ */

function initApp() {
  loadSavedTheme();
  initEventListeners();
}

/* ================================================ */
/*                 BOOTSTRAP                        */
/* ================================================ */

document.addEventListener('DOMContentLoaded', initApp);
