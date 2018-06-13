export const changeColor = (event, name) => {
    event.stopPropagation();
    switch ( name ) {
        case 'base': return setColor('base');
        case 'blue': return setColor('blue');
        case 'red': return setColor('red');
        default: return;
    }
}

const saveColor = (name, color1, color2) => {
    const root = document.documentElement;

    root.style.setProperty('--color1', color1);
    root.style.setProperty('--color2', color2);
    localStorage.setItem('appTheme', name);
}

export const setColor = (theme) => {
    if (!theme) {
        theme = localStorage.getItem('appTheme') || 'base';
    }
    if(theme === 'base') {
        saveColor('base', '#00ffe6', '#027c6d');
    }
    if(theme === 'blue') {
        saveColor('blue', '#a1daf8', '#1e71ba');
    }
    if(theme === 'red') {
        saveColor('red', '#ff3a3a', '#981212');
    }
}

export const toggleSidePanel = () => {
    const panel = document.querySelector('.Side_panel');

    if(panel.classList.contains('Open')) {
        panel.classList.remove('Open');
    } else {
        panel.classList.add('Open');
    }
}

export const setAppCurrency = event => {
    event.stopPropagation();
    localStorage.setItem('appCurrency', event.target.value);
}

export const clearLocalstorage = event => {
    event.stopPropagation();
    localStorage.clear();
    console.log('Localstorage clearance successful');
}

export const userLogout = () => window.gapi.auth2.getAuthInstance().signOut();

export const updateObject = (oldObject, newProps) => {
    return {
        ...oldObject,
        ...newProps
    }
}