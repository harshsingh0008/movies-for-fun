// Mock recommendations for now - will work without API key
export async function getMovieRecommendations(movieData) {
    // If no movie data, return empty array
    if (!movieData || !movieData.Title) {
        return [];
    }

    // Return different recommendations based on movie genre/title
    const recommendations = getRecommendationsByMovie(movieData);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return recommendations;
}

// Get recommendations based on movie
function getRecommendationsByMovie(movieData) {
    const title = movieData.Title.toLowerCase();
    const genre = movieData.Genre || '';
    
    // Sci-Fi recommendations
    if (title.includes('inception') || genre.includes('Sci-Fi')) {
        return [
            { title: 'The Matrix', year: 1999, reason: 'Both explore reality vs illusion with mind-bending action', mood: 'mind-bending', poster: 'N/A' },
            { title: 'Interstellar', year: 2014, reason: 'Epic sci-fi with emotional depth and stunning visuals', mood: 'emotional', poster: 'N/A' },
            { title: 'Shutter Island', year: 2010, reason: 'Psychological thriller that keeps you guessing', mood: 'suspenseful', poster: 'N/A' },
            { title: 'Tenet', year: 2020, reason: 'Another mind-bender with time manipulation', mood: 'complex', poster: 'N/A' }
        ];
    }
    
    // Drama recommendations
    if (genre.includes('Drama')) {
        return [
            { title: 'The Shawshank Redemption', year: 1994, reason: 'Powerful drama about hope and friendship', mood: 'inspiring', poster: 'N/A' },
            { title: 'Forrest Gump', year: 1994, reason: 'Heartwarming journey through decades', mood: 'emotional', poster: 'N/A' },
            { title: 'The Green Mile', year: 1999, reason: 'Magical realism meets powerful drama', mood: 'touching', poster: 'N/A' },
            { title: 'Good Will Hunting', year: 1997, reason: 'Story of self-discovery and mentorship', mood: 'heartfelt', poster: 'N/A' }
        ];
    }
    
    // Action recommendations
    if (genre.includes('Action')) {
        return [
            { title: 'The Dark Knight', year: 2008, reason: 'Perfect blend of action and drama', mood: 'thrilling', poster: 'N/A' },
            { title: 'Mad Max: Fury Road', year: 2015, reason: 'Non-stop action with stunning visuals', mood: 'intense', poster: 'N/A' },
            { title: 'John Wick', year: 2014, reason: 'Stylish action with great choreography', mood: 'adrenaline', poster: 'N/A' },
            { title: 'Gladiator', year: 2000, reason: 'Epic action with emotional depth', mood: 'epic', poster: 'N/A' }
        ];
    }
    
    // Default recommendations
    return [
        { title: 'The Dark Knight', year: 2008, reason: 'Masterpiece of modern cinema', mood: 'thrilling', poster: 'N/A' },
        { title: 'Pulp Fiction', year: 1994, reason: 'Cult classic with unique storytelling', mood: 'stylish', poster: 'N/A' },
        { title: 'Fight Club', year: 1999, reason: 'Thought-provoking with twist ending', mood: 'mind-bending', poster: 'N/A' },
        { title: 'The Matrix', year: 1999, reason: 'Groundbreaking sci-fi action', mood: 'revolutionary', poster: 'N/A' }
    ];
}