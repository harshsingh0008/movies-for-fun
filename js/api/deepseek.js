import { API_CONFIG } from '../utils/constants.js';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
const API_KEY = API_CONFIG.deepseek.key;

// Get real movie recommendations from DeepSeek API
export async function getMovieRecommendations(movieData) {
    console.log('Getting real DeepSeek recommendations for:', movieData.Title);
    
    // If no movie data, return empty array
    if (!movieData || !movieData.Title) {
        console.log('No movie data provided');
        return [];
    }
    
    // Check if API key is configured
    if (!API_KEY || API_KEY === 'YOUR_DEEPSEEK_KEY' || API_KEY.includes('sk-') === false) {
        console.warn('DeepSeek API key not properly configured. Using enhanced mock data instead.');
        return getEnhancedMockRecommendations(movieData);
    }
    
    try {
        // Create prompt for DeepSeek
        const prompt = createRecommendationPrompt(movieData);
        
        console.log('Sending request to DeepSeek API...');
        
        const response = await fetch(DEEPSEEK_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a movie recommendation expert. Based on the movie details provided, recommend 4 similar movies. Return ONLY a valid JSON array without any markdown formatting or additional text. Each recommendation should have title, year, reason, and mood fields.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 500
            })
        });
        
        if (!response.ok) {
            const errorData = await response.text();
            console.error('DeepSeek API error:', response.status, errorData);
            throw new Error(`API returned ${response.status}`);
        }
        
        const data = await response.json();
        console.log('DeepSeek response received');
        
        // Parse the response content
        const content = data.choices[0].message.content;
        console.log('Raw response:', content);
        
        // Try to parse JSON from the response
        let recommendations;
        try {
            // Clean the response - remove any markdown formatting
            const cleanedContent = content.replace(/```json|```/g, '').trim();
            recommendations = JSON.parse(cleanedContent);
        } catch (parseError) {
            console.error('Failed to parse JSON response:', parseError);
            // Try to extract JSON using regex
            const jsonMatch = content.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
                try {
                    recommendations = JSON.parse(jsonMatch[0]);
                } catch (e) {
                    throw new Error('Could not parse recommendations');
                }
            } else {
                throw new Error('No valid JSON found in response');
            }
        }
        
        // Validate recommendations format
        if (!Array.isArray(recommendations) || recommendations.length === 0) {
            throw new Error('Invalid recommendations format');
        }
        
        console.log(`Got ${recommendations.length} recommendations`);
        return recommendations.slice(0, 4); // Ensure max 4 recommendations
        
    } catch (error) {
        console.error('Error getting DeepSeek recommendations:', error);
        console.log('Falling back to enhanced mock recommendations');
        return getEnhancedMockRecommendations(movieData);
    }
}

// Create prompt for DeepSeek API
function createRecommendationPrompt(movieData) {
    return `Based on this movie:
    Title: ${movieData.Title}
    Year: ${movieData.Year}
    Genre: ${movieData.Genre || 'Unknown'}
    Plot: ${movieData.Plot || 'No plot available'}
    Director: ${movieData.Director || 'Unknown'}
    Actors: ${movieData.Actors || 'Unknown'}
    IMDb Rating: ${movieData.imdbRating || 'N/A'}
    
    Recommend 4 similar movies. For each, provide:
    - title: movie title
    - year: release year
    - reason: why it's similar (1 sentence)
    - mood: viewing mood (e.g., "mind-bending", "emotional", "action-packed", "thought-provoking")
    
    Return as JSON array. Example format:
    [{"title":"The Matrix","year":1999,"reason":"Both explore reality vs illusion with mind-bending action","mood":"mind-bending"}]`;
}

// Enhanced mock recommendations when DeepSeek API is not available
function getEnhancedMockRecommendations(movieData) {
    const title = movieData.Title.toLowerCase();
    const genre = movieData.Genre ? movieData.Genre.toLowerCase() : '';
    
    console.log('Using enhanced mock recommendations for:', title);
    
    // Horror recommendations
    if (genre.includes('horror') || title.includes('horror')) {
        return [
            { title: 'The Conjuring', year: 2013, reason: 'Supernatural horror with intense atmosphere', mood: 'terrifying' },
            { title: 'Hereditary', year: 2018, reason: 'Psychological horror that slowly builds dread', mood: 'disturbing' },
            { title: 'A Quiet Place', year: 2018, reason: 'Innovative horror with unique premise', mood: 'tense' },
            { title: 'Get Out', year: 2017, reason: 'Social thriller with clever twists', mood: 'suspenseful' }
        ];
    }
    
    // Comedy recommendations
    if (genre.includes('comedy')) {
        return [
            { title: 'Superbad', year: 2007, reason: 'Hilarious coming-of-age comedy', mood: 'funny' },
            { title: 'The Hangover', year: 2009, reason: 'Wild comedy with unforgettable moments', mood: 'hilarious' },
            { title: 'Bridesmaids', year: 2011, reason: 'Smart comedy with heart', mood: 'entertaining' },
            { title: 'Step Brothers', year: 2008, reason: 'Absurd comedy with great chemistry', mood: 'silly' }
        ];
    }
    
    // Romance recommendations
    if (genre.includes('romance')) {
        return [
            { title: 'The Notebook', year: 2004, reason: 'Classic romantic drama', mood: 'romantic' },
            { title: 'Pride and Prejudice', year: 2005, reason: 'Beautiful period romance', mood: 'heartwarming' },
            { title: 'La La Land', year: 2016, reason: 'Musical romance with stunning visuals', mood: 'bittersweet' },
            { title: 'Eternal Sunshine', year: 2004, reason: 'Unique take on love and memory', mood: 'thoughtful' }
        ];
    }
    
    // Sci-Fi recommendations
    if (title.includes('inception') || genre.includes('sci-fi') || genre.includes('sci fi')) {
        return [
            { title: 'The Matrix', year: 1999, reason: 'Both explore reality vs illusion with mind-bending action', mood: 'mind-bending' },
            { title: 'Interstellar', year: 2014, reason: 'Epic sci-fi with emotional depth and stunning visuals', mood: 'emotional' },
            { title: 'Arrival', year: 2016, reason: 'Thought-provoking sci-fi about communication', mood: 'contemplative' },
            { title: 'Blade Runner 2049', year: 2017, reason: 'Visually stunning sci-fi with deep themes', mood: 'atmospheric' }
        ];
    }
    
    // Drama recommendations
    if (genre.includes('drama')) {
        return [
            { title: 'The Shawshank Redemption', year: 1994, reason: 'Powerful drama about hope and friendship', mood: 'inspiring' },
            { title: 'Forrest Gump', year: 1994, reason: 'Heartwarming journey through decades', mood: 'emotional' },
            { title: 'The Green Mile', year: 1999, reason: 'Magical realism meets powerful drama', mood: 'touching' },
            { title: 'Good Will Hunting', year: 1997, reason: 'Story of self-discovery and mentorship', mood: 'heartfelt' }
        ];
    }
    
    // Action recommendations
    if (genre.includes('action')) {
        return [
            { title: 'The Dark Knight', year: 2008, reason: 'Perfect blend of action and drama', mood: 'thrilling' },
            { title: 'Mad Max: Fury Road', year: 2015, reason: 'Non-stop action with stunning visuals', mood: 'intense' },
            { title: 'John Wick', year: 2014, reason: 'Stylish action with great choreography', mood: 'adrenaline' },
            { title: 'Gladiator', year: 2000, reason: 'Epic action with emotional depth', mood: 'epic' }
        ];
    }
    
    // For specific movies
    if (title.includes('oppenheimer')) {
        return [
            { title: 'The Imitation Game', year: 2014, reason: 'Historical drama about a brilliant mind', mood: 'thoughtful' },
            { title: 'The Social Network', year: 2010, reason: 'Biographical drama with sharp dialogue', mood: 'intense' },
            { title: 'The Theory of Everything', year: 2014, reason: 'Story of scientific genius and love', mood: 'inspiring' },
            { title: 'A Beautiful Mind', year: 2001, reason: 'Biography of a mathematical genius', mood: 'emotional' }
        ];
    }
    
    if (title.includes('dune')) {
        return [
            { title: 'Blade Runner 2049', year: 2017, reason: 'Same director - epic sci-fi with stunning visuals', mood: 'atmospheric' },
            { title: 'Arrival', year: 2016, reason: 'Thoughtful sci-fi with grand scale', mood: 'contemplative' },
            { title: 'The Lord of the Rings', year: 2001, reason: 'Epic fantasy with rich world-building', mood: 'epic' },
            { title: 'Star Wars: A New Hope', year: 1977, reason: 'Classic space opera with heroes journey', mood: 'adventurous' }
        ];
    }
    
    // Default recommendations
    return [
        { title: 'The Dark Knight', year: 2008, reason: 'Masterpiece of modern cinema', mood: 'thrilling' },
        { title: 'Inception', year: 2010, reason: 'Mind-bending thriller with complex plot', mood: 'mind-bending' },
        { title: 'Pulp Fiction', year: 1994, reason: 'Cult classic with unique storytelling', mood: 'stylish' },
        { title: 'The Matrix', year: 1999, reason: 'Groundbreaking sci-fi action', mood: 'revolutionary' }
    ];
}

// Test function to check if DeepSeek API is working
export async function testDeepSeekAPI() {
    console.log('Testing DeepSeek API connection...');
    
    if (!API_KEY || API_KEY === 'YOUR_DEEPSEEK_KEY' || API_KEY.includes('sk-') === false) {
        console.error('❌ DeepSeek API key not properly configured');
        return false;
    }
    
    try {
        const response = await fetch(DEEPSEEK_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [
                    { role: 'system', content: 'You are a helpful assistant.' },
                    { role: 'user', content: 'Say "API is working" if you receive this.' }
                ],
                temperature: 0.1,
                max_tokens: 20
            })
        });
        
        if (response.ok) {
            console.log('✅ DeepSeek API is working!');
            return true;
        } else {
            console.error('❌ DeepSeek API returned error:', response.status);
            return false;
        }
    } catch (error) {
        console.error('❌ DeepSeek API test failed:', error);
        return false;
    }
}

// Export all functions
export default {
    getMovieRecommendations,
    testDeepSeekAPI
};