/* ================================================= */
/*                    api.js                        */
/*                  DATA LAYER                      */
/* ================================================= */

/*
  This module is responsible ONLY for:
  - Communicating with the OMDb API
  - Handling network errors
  - Handling API response errors
  - Returning clean JSON data

  Absolutely NO DOM logic here.
*/

const API_KEY = 'ee9e50e4';
const BASE_URL = 'https://www.omdbapi.com/';

/**
 * Fetch movie data from OMDb API
 * @param {string} title - Movie title to search
 * @returns {Promise<Object>} Clean movie JSON
 */
export async function fetchMovieData(title) {

  if (!title || typeof title !== 'string') {
    throw new Error('Invalid movie title.');
  }

  const url = `${BASE_URL}?apikey=${API_KEY}&t=${encodeURIComponent(title)}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const data = await response.json();

    // OMDb-specific error handling
    if (data.Response === "False") {
      throw new Error(data.Error || 'Movie not found.');
    }

    return data;

  } catch (error) {

    // Normalize error message
    if (error.name === 'TypeError') {
      throw new Error('Network error. Please check your connection.');
    }

    throw error;
  }
}
