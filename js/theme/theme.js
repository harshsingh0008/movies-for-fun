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
    console.log('Applying theme:', theme);
    
    // Remove both theme classes
    document.body.classList.remove(themes.dark, themes.light);
    // Add the selected theme
    document.body.classList.add(theme);
    
    // Update the theme toggle icon
    updateThemeIcon(theme);
    
    // Update meta theme-color for mobile browsers (optional)
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
        metaThemeColor.setAttribute('content', 
            theme === themes.dark ? '#070b16' : '#f8fafc'
        );
    }
    
    console.log(`Theme applied: ${theme}`);
}

// Update theme icon
function updateThemeIcon(theme) {
    // Try multiple selectors in case the icon element structure changed
    const themeIcon = document.querySelector('#theme-toggle i');
    const themeBtn = document.querySelector('#theme-toggle');
    
    if (themeIcon) {
        if (theme === themes.dark) {
            themeIcon.className = 'fa-solid fa-moon';  // Moon for dark mode
        } else {
            themeIcon.className = 'fa-solid fa-sun';   // Sun for light mode
        }
        console.log('Theme icon updated');
    } else {
        console.warn('Theme icon not found');
        
        // Fallback: if icon not found, try to update the button text or create icon
        if (themeBtn) {
            themeBtn.innerHTML = theme === themes.dark 
                ? '<i class="fa-solid fa-moon"></i>' 
                : '<i class="fa-solid fa-sun"></i>';
            console.log('Theme button updated via fallback');
        }
    }
}

// Toggle between dark and light mode
export function toggleTheme() {
    console.log('toggleTheme called');
    
    try {
        // Get current theme from localStorage or default to dark
        const currentTheme = localStorage.getItem(THEME_KEY) || themes.dark;
        console.log('Current theme from storage:', currentTheme);
        
        // Switch to the opposite theme
        const newTheme = currentTheme === themes.dark ? themes.light : themes.dark;
        console.log('New theme:', newTheme);

        // Save to localStorage
        localStorage.setItem(THEME_KEY, newTheme);
        console.log('Theme saved to localStorage');
        
        // Apply the new theme
        applyTheme(newTheme);
        
        return newTheme;
    } catch (error) {
        console.error('Error toggling theme:', error);
        
        // Fallback: toggle manually
        if (document.body.classList.contains(themes.dark)) {
            document.body.classList.remove(themes.dark);
            document.body.classList.add(themes.light);
        } else {
            document.body.classList.remove(themes.light);
            document.body.classList.add(themes.dark);
        }
    }
}

// Load saved theme on app start
export function loadSavedTheme() {
    console.log('loadSavedTheme called');
    
    try {
        // Get saved theme from localStorage or default to dark
        const savedTheme = localStorage.getItem(THEME_KEY) || themes.dark;
        console.log('Saved theme:', savedTheme);
        
        // Apply the saved theme
        applyTheme(savedTheme);
        
        return savedTheme;
    } catch (error) {
        console.error('Error loading saved theme:', error);
        // Default to dark mode if error
        document.body.classList.add(themes.dark);
        return themes.dark;
    }
}

// Force update theme (useful if button exists but theme not applying)
export function forceThemeRefresh() {
    console.log('Forcing theme refresh');
    const currentTheme = localStorage.getItem(THEME_KEY) || themes.dark;
    applyTheme(currentTheme);
}

// Optional: Get current theme
export function getCurrentTheme() {
    return localStorage.getItem(THEME_KEY) || themes.dark;
}

// Optional: Check if dark mode is active
export function isDarkMode() {
    return document.body.classList.contains(themes.dark);
}

// Initialize theme system (call this early)
export function initTheme() {
    console.log('Initializing theme system');
    loadSavedTheme();
    
    // Make sure theme toggle button exists and has event listener
    const themeBtn = document.querySelector('#theme-toggle');
    if (themeBtn) {
        console.log('Theme toggle button found');
        
        // Remove any existing listeners to avoid duplicates
        const newBtn = themeBtn.cloneNode(true);
        themeBtn.parentNode.replaceChild(newBtn, themeBtn);
        
        // Add fresh event listener
        newBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Theme toggle button clicked');
            toggleTheme();
        });
        
        console.log('Theme toggle event listener attached');
    } else {
        console.error('Theme toggle button not found in DOM');
    }
}