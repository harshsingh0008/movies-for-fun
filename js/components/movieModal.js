// Setup movie details modal
export function setupModal() {
    const modal = document.getElementById('movie-modal');
    const closeBtn = document.querySelector('.close-modal');
    
    // Close modal when clicking X
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Show movie in modal
export function showMovieModal(movieData) {
    const modal = document.getElementById('movie-modal');
    const modalContent = document.getElementById('modal-content');
    
    const poster = movieData.Poster && movieData.Poster !== "N/A" 
        ? movieData.Poster 
        : "https://via.placeholder.com/300x450?text=No+Image";
    
    modalContent.innerHTML = `
        <div class="movie-card" style="background: transparent; box-shadow: none;">
            <div class="movie-poster">
                <img src="${poster}" alt="${movieData.Title}">
            </div>
            <div class="movie-info">
                <h2>${movieData.Title} (${movieData.Year})</h2>
                <div class="rating">⭐ IMDb: ${movieData.imdbRating}</div>
                <p><strong>Genre:</strong> ${movieData.Genre}</p>
                <p><strong>Director:</strong> ${movieData.Director}</p>
                <p><strong>Actors:</strong> ${movieData.Actors}</p>
                <p><strong>Runtime:</strong> ${movieData.Runtime}</p>
                <p><strong>Language:</strong> ${movieData.Language}</p>
                <p><strong>Country:</strong> ${movieData.Country}</p>
                <p><strong>Awards:</strong> ${movieData.Awards}</p>
                <p class="plot"><strong>Plot:</strong> ${movieData.Plot}</p>
                <button class="trailer-btn" onclick="window.open('https://www.youtube.com/results?search_query=${encodeURIComponent(movieData.Title + ' ' + movieData.Year + ' trailer')}', '_blank')">
                    <i class="fa-brands fa-youtube"></i> Watch Trailer
                </button>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}