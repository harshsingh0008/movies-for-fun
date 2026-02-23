import { searchMovies } from '../api/omdb.js';

export function setupSearchSuggestions(inputElement, onSuggestionClick) {
    let timeoutId;
    let suggestionsContainer = document.getElementById('search-suggestions');
    
    if (!suggestionsContainer) {
        suggestionsContainer = document.createElement('div');
        suggestionsContainer.id = 'search-suggestions';
        suggestionsContainer.className = 'search-suggestions';
        inputElement.parentNode.appendChild(suggestionsContainer);
    }
    
    inputElement.addEventListener('input', (e) => {
        clearTimeout(timeoutId);
        const query = e.target.value.trim();
        
        if (query.length < 2) {
            suggestionsContainer.style.display = 'none';
            return;
        }
        
        timeoutId = setTimeout(async () => {
            try {
                const results = await searchMovies(query);
                showSuggestions(results, suggestionsContainer, inputElement, onSuggestionClick);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        }, 500);
    });
    
    // Close suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-suggestions') && !e.target.closest('#search-input')) {
            suggestionsContainer.style.display = 'none';
        }
    });
}

function showSuggestions(movies, container, inputElement, onSuggestionClick) {
    if (!movies || movies.length === 0) {
        container.style.display = 'none';
        return;
    }
    
    container.innerHTML = movies.slice(0, 5).map(movie => `
        <div class="suggestion-item" data-title="${movie.Title}">
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/40x60?text=No+Image'}" alt="${movie.Title}">
            <div>
                <strong>${movie.Title}</strong>
                <div class="year">${movie.Year}</div>
            </div>
        </div>
    `).join('');
    
    container.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', () => {
            const title = item.dataset.title;
            inputElement.value = title;
            container.style.display = 'none';
            onSuggestionClick(title);
        });
    });
    
    container.style.display = 'block';
}