export function showTrailerModal(movieTitle, movieYear) {
    const searchQuery = encodeURIComponent(`${movieTitle} ${movieYear} official trailer`);
    const trailerUrl = `https://www.youtube.com/embed?listType=search&list=${searchQuery}`;
    
    let trailerModal = document.getElementById('trailer-modal');
    
    if (!trailerModal) {
        trailerModal = document.createElement('div');
        trailerModal.id = 'trailer-modal';
        trailerModal.className = 'modal';
        trailerModal.innerHTML = `
            <div class="modal-content trailer-content">
                <span class="close-trailer">&times;</span>
                <iframe id="trailer-iframe" width="100%" height="500" frameborder="0" allowfullscreen></iframe>
            </div>
        `;
        document.body.appendChild(trailerModal);
        
        // Close button
        trailerModal.querySelector('.close-trailer').addEventListener('click', () => {
            trailerModal.style.display = 'none';
            document.getElementById('trailer-iframe').src = '';
        });
        
        // Click outside to close
        window.addEventListener('click', (e) => {
            if (e.target === trailerModal) {
                trailerModal.style.display = 'none';
                document.getElementById('trailer-iframe').src = '';
            }
        });
    }
    
    // Set video and show modal
    const iframe = document.getElementById('trailer-iframe');
    iframe.src = trailerUrl;
    trailerModal.style.display = 'block';
}