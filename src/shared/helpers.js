export const changeColor = () => {
    const theme = localStorage.getItem('appTheme') || 'base';
    switch ( theme ) {
        case 'alt': return setColor('base');
        case 'base': return setColor('alt');
        default: return;
    }
}

export const setColor = (theme) => {
    const root = document.documentElement;
    if (!theme) {
        theme = localStorage.getItem('appTheme') || 'base';
    }
    if(theme === 'alt') {
        root.style.setProperty('--color1', '#a1daf8');
        root.style.setProperty('--color2', '#1e71ba');
        localStorage.setItem('appTheme', 'alt');
    }
    if(theme === 'base') {
        root.style.setProperty('--color1', '#00ffe6');
        root.style.setProperty('--color2', '#027c6d');
        localStorage.setItem('appTheme', 'base');
    }
}

export const userLogout = () => window.gapi.auth2.getAuthInstance().signOut();

export const updateObject = (oldObject, newProps) => {
    return {
        ...oldObject,
        ...newProps
    }
}