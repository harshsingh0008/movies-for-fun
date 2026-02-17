/* ================================================= */
/*                     ui.js                        */
/*               PRESENTATION LAYER                 */
/* ================================================= */

/*
  Responsibilities:
  - Render movie data
  - Display loading state
  - Display error messages
  - Handle DOM injection

  No API logic here.
*/

const movieContainer = document.querySelector('#movie-container');

/* ================================================ */
/*                LOADING STATE                     */
/* ================================================ */

export function showLoadingState() {
  movieContainer.innerHTML = `
    <div class="glass-card loading-card">
      <div class="loader"></div>
      <p>Fetching movie data...</p>
    </div>
  `;
}

/* ================================================ */
/*               ERROR MESSAGE                      */
/* ================================================ */

export function showErrorMessage(message) {
  movieContainer.innerHTML = `
    <div class="glass-card error-card">
      <h3>⚠️ Something went wrong</h3>
      <p>${message}</p>
    </div>
  `;
}

/* ================================================ */
/*               RENDER MOVIE CARD                  */
/* ================================================ */

export function renderMovie(data) {

  const {
    Title,
    Year,
    Genre,
    Plot,
    Poster,
    imdbRating,
    Director,
    Actors
  } = data;

  const posterUrl =
    Poster && Poster !== "N/A"
      ? Poster
      : "https://via.placeholder.com/300x450?text=No+Image";

  movieContainer.innerHTML = `
    <div class="glass-card movie-card">
      
      <div class="movie-poster">
        <img src="${posterUrl}" alt="${Title} Poster" />
      </div>

      <div class="movie-info">
        <h2>${Title} <span>(${Year})</span></h2>
        <p class="rating">⭐ IMDB: ${imdbRating}</p>
        <p><strong>Genre:</strong> ${Genre}</p>
        <p><strong>Director:</strong> ${Director}</p>
        <p><strong>Actors:</strong> ${Actors}</p>
        <p class="plot">${Plot}</p>
      </div>

    </div>
  `;
}
