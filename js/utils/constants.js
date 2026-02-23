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

// Log API key status (without exposing the full key)
console.log('API Keys status:', {
    omdb: API_CONFIG.omdb.key ? '✅ Present' : '❌ Missing',
    deepseek: API_CONFIG.deepseek.key ? '✅ Present' : '❌ Missing (Mock mode active)',
    youtube: API_CONFIG.youtube.key ? '✅ Present' : '❌ Missing (Using search links)'
});

// Homepage Sections
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

// Enhanced Mock Data for when APIs fail
export const MOCK_MOVIES = {
    trending: [
        { 
            imdbID: 'tt15398776', 
            Title: 'Oppenheimer', 
            Year: '2023', 
            Poster: 'N/A',
            imdbRating: '8.4',
            Genre: 'Biography, Drama, History',
            Director: 'Christopher Nolan',
            Actors: 'Cillian Murphy, Emily Blunt, Matt Damon'
        },
        { 
            imdbID: 'tt15239678', 
            Title: 'Dune: Part Two', 
            Year: '2024', 
            Poster: 'N/A',
            imdbRating: '8.9',
            Genre: 'Action, Adventure, Drama',
            Director: 'Denis Villeneuve',
            Actors: 'Timothée Chalamet, Zendaya, Rebecca Ferguson'
        },
        { 
            imdbID: 'tt1517268', 
            Title: 'Barbie', 
            Year: '2023', 
            Poster: 'N/A',
            imdbRating: '7.0',
            Genre: 'Adventure, Comedy, Fantasy',
            Director: 'Greta Gerwig',
            Actors: 'Margot Robbie, Ryan Gosling, Issa Rae'
        },
        { 
            imdbID: 'tt9362722', 
            Title: 'Spider-Man: Across the Spider-Verse', 
            Year: '2023', 
            Poster: 'N/A',
            imdbRating: '8.7',
            Genre: 'Animation, Action, Adventure',
            Director: 'Joaquim Dos Santos, Kemp Powers, Justin K. Thompson',
            Actors: 'Shameik Moore, Hailee Steinfeld, Brian Tyree Henry'
        },
        { 
            imdbID: 'tt1745960', 
            Title: 'Top Gun: Maverick', 
            Year: '2022', 
            Poster: 'N/A',
            imdbRating: '8.3',
            Genre: 'Action, Drama',
            Director: 'Joseph Kosinski',
            Actors: 'Tom Cruise, Jennifer Connelly, Miles Teller'
        },
        { 
            imdbID: 'tt9032400', 
            Title: 'John Wick: Chapter 4', 
            Year: '2023', 
            Poster: 'N/A',
            imdbRating: '8.0',
            Genre: 'Action, Crime, Thriller',
            Director: 'Chad Stahelski',
            Actors: 'Keanu Reeves, Donnie Yen, Bill Skarsgård'
        }
    ],
    topRated: [
        { 
            imdbID: 'tt0111161', 
            Title: 'The Shawshank Redemption', 
            Year: '1994', 
            Poster: 'N/A',
            imdbRating: '9.3',
            Genre: 'Drama',
            Director: 'Frank Darabont',
            Actors: 'Tim Robbins, Morgan Freeman, Bob Gunton'
        },
        { 
            imdbID: 'tt0068646', 
            Title: 'The Godfather', 
            Year: '1972', 
            Poster: 'N/A',
            imdbRating: '9.2',
            Genre: 'Crime, Drama',
            Director: 'Francis Ford Coppola',
            Actors: 'Marlon Brando, Al Pacino, James Caan'
        },
        { 
            imdbID: 'tt0468569', 
            Title: 'The Dark Knight', 
            Year: '2008', 
            Poster: 'N/A',
            imdbRating: '9.0',
            Genre: 'Action, Crime, Drama',
            Director: 'Christopher Nolan',
            Actors: 'Christian Bale, Heath Ledger, Aaron Eckhart'
        },
        { 
            imdbID: 'tt0071562', 
            Title: 'The Godfather Part II', 
            Year: '1974', 
            Poster: 'N/A',
            imdbRating: '9.0',
            Genre: 'Crime, Drama',
            Director: 'Francis Ford Coppola',
            Actors: 'Al Pacino, Robert De Niro, Robert Duvall'
        },
        { 
            imdbID: 'tt0050083', 
            Title: '12 Angry Men', 
            Year: '1957', 
            Poster: 'N/A',
            imdbRating: '9.0',
            Genre: 'Crime, Drama',
            Director: 'Sidney Lumet',
            Actors: 'Henry Fonda, Lee J. Cobb, Martin Balsam'
        },
        { 
            imdbID: 'tt0108052', 
            Title: "Schindler's List", 
            Year: '1993', 
            Poster: 'N/A',
            imdbRating: '9.0',
            Genre: 'Biography, Drama, History',
            Director: 'Steven Spielberg',
            Actors: 'Liam Neeson, Ralph Fiennes, Ben Kingsley'
        }
    ]
};

// Helper function to test API connectivity
export async function testOMDbAPI() {
    console.log('Testing OMDb API connection...');
    try {
        const response = await fetch(`${API_CONFIG.omdb.baseUrl}?apikey=${API_CONFIG.omdb.key}&s=batman`);
        const data = await response.json();
        console.log('OMDb API test:', data.Response === 'True' ? '✅ Working' : '❌ Failed', data);
        return data.Response === 'True';
    } catch (error) {
        console.error('OMDb API test failed:', error);
        return false;
    }
}

// Export version info
export const VERSION = '2.0.0';