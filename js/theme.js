/* ================================================= */
/*                    theme.js                      */
/*                    UX LAYER                      */
/* ================================================= */

/*
  Responsibilities:
  - Toggle theme
  - Persist theme preference
  - Apply saved theme on load

  No API or rendering logic here.
*/

const THEME_KEY = 'movie-app-theme';

const themes = {
  dark: 'dark-mode',
  light: 'light-mode'
};

/* ================================================ */
/*              APPLY THEME                         */
/* ================================================ */

function applyTheme(theme) {
  document.body.classList.remove(themes.dark, themes.light);
  document.body.classList.add(theme);
}

/* ================================================ */
/*              TOGGLE THEME                        */
/* ================================================ */

export function toggleTheme() {
  const currentTheme = localStorage.getItem(THEME_KEY) || themes.dark;

  const newTheme =
    currentTheme === themes.dark
      ? themes.light
      : themes.dark;

  localStorage.setItem(THEME_KEY, newTheme);
  applyTheme(newTheme);
}

/* ================================================ */
/*          LOAD SAVED THEME ON START               */
/* ================================================ */

export function loadSavedTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY) || themes.dark;
  applyTheme(savedTheme);
}
