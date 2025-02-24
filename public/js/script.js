let initialTheme = true;
const darkButton = document.querySelector('.darkmode')
const addPlayerButton = document.querySelector('.points-button')
const addPlayerWrapper = document.querySelector('.form-overlay-wrapper')

darkButton.addEventListener ('click', toggleDarkMode);
addPlayerButton.addEventListener ('click', toggleAddPlayer)

function toggleAddPlayer() {
    addPlayerWrapper.classList.toggle ('show-player')
}

function toggleDarkMode() {
    const root = document.documentElement;

    if (initialTheme) {
        root.style.setProperty('--main-dark', '#c2c2c2');
        root.style.setProperty('--main-offwhite', '#1d1d1b');
        root.style.setProperty('--main-bright', 'grey');
        root.style.setProperty('--main-border', '1px solid var(--main-dark)');
        initialTheme = false;
    } else {
        root.style.setProperty('--main-dark', '#1d1d1b');
        root.style.setProperty('--main-offwhite', '#e6e6e6');
        root.style.setProperty('--main-bright', '#b69df0');
        root.style.setProperty('--main-border', '1px solid var(--main-dark)');


        initialTheme = true;
    }
}