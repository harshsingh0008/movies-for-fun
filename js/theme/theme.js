/* ================================================= */
/*                    THEME SYSTEM                   */
/* ================================================= */

const THEME_KEY = 'movie-app-theme';

const themes = {
    dark: 'dark-mode',
    light: 'light-mode'
};

// Apply theme to body and update icon
function applyTheme(theme) {
    // Remove both theme classes
    document.body.classList.remove(themes.dark, themes.light);
    // Add the selected theme
    document.body.classList.add(theme);
    
    // Update the theme toggle icon
    const themeIcon = document.querySelector('#theme-toggle i');
    if (themeIcon) {
        if (theme === themes.dark) {
            themeIcon.className = 'fa-solid fa-moon';  // Moon for dark mode
        } else {
            themeIcon.className = 'fa-solid fa-sun';   // Sun for light mode
        }
    }
    
    // Update meta theme-color for mobile browsers (optional)
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
        metaThemeColor.setAttribute('content', 
            theme === themes.dark ? '#070b16' : '#f8fafc'
        );
    }
    
    console.log(`Theme applied: ${theme}`); // For debugging
}

// Toggle between dark and light mode
export function toggleTheme() {
    // Get current theme from localStorage or default to dark
    const currentTheme = localStorage.getItem(THEME_KEY) || themes.dark;
    
    // Switch to the opposite theme
    const newTheme = currentTheme === themes.dark ? themes.light : themes.dark;

    // Save to localStorage
    localStorage.setItem(THEME_KEY, newTheme);
    
    // Apply the new theme
    applyTheme(newTheme);
    
    console.log(`Theme toggled: ${newTheme}`); // For debugging
}

// Load saved theme on app start
export function loadSavedTheme() {
    // Get saved theme from localStorage or default to dark
    const savedTheme = localStorage.getItem(THEME_KEY) || themes.dark;
    
    // Apply the saved theme
    applyTheme(savedTheme);
    
    console.log(`Saved theme loaded: ${savedTheme}`); // For debugging
}

// Optional: Get current theme
export function getCurrentTheme() {
    return localStorage.getItem(THEME_KEY) || themes.dark;
}

// Optional: Check if dark mode is active
export function isDarkMode() {
    return document.body.classList.contains(themes.dark);
}