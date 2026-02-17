// API Configuration
export const API_CONFIG = {
    omdb: {
        key: 'ee9e50e4',  // Your existing key
        baseUrl: 'https://www.omdbapi.com/'
    },
    deepseek: {
        key: 'sk-3f899a01e2ce4afd947bf709387f1688', 
        baseUrl: 'https://api.deepseek.com/v1'
    },
    youtube: {
        key: 'AIzaSyBbfA4ae1Is9SjYSPAQdmq_59gQbsfqJvU',   
        baseUrl: 'https://www.googleapis.com/youtube/v3'
    }
};


export const HOME_SECTIONS = [
    {
        id: 'trending',
        title: '🔥 Trending Now',
        icon: 'fa-solid fa-fire',
        limit: 6
    },
    {
        id: 'topRated',
        title: '⭐ Top Rated All Time',
        icon: 'fa-solid fa-star',
        limit: 6
    }
    
];

// Error Messages
export const ERROR_MESSAGES = {
    NETWORK: 'Network error. Please check your connection.',
    NOT_FOUND: 'Movie not found. Please try another title.',
    GENERIC: 'Something went wrong. Please try again.'
};


export const MOCK_MOVIES = {
    trending: [
        { imdbID: 'tt15398776', Title: 'Oppenheimer', Year: '2023', Poster: 'N/A' },
        { imdbID: 'tt15239678', Title: 'Dune: Part Two', Year: '2024', Poster: 'N/A' },
        { imdbID: 'tt21263535', Title: 'Poor Things', Year: '2023', Poster: 'N/A' },
        { imdbID: 'tt6718170', Title: 'The Boys in the Boat', Year: '2023', Poster: 'N/A' }
    ],
    topRated: [
        { imdbID: 'tt0111161', Title: 'The Shawshank Redemption', Year: '1994', Poster: 'N/A' },
        { imdbID: 'tt0068646', Title: 'The Godfather', Year: '1972', Poster: 'N/A' },
        { imdbID: 'tt0468569', Title: 'The Dark Knight', Year: '2008', Poster: 'N/A' },
        { imdbID: 'tt0071562', Title: 'The Godfather Part II', Year: '1974', Poster: 'N/A' }
    ]
    
};