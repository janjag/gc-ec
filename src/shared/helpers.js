export const changeColor = () => {
    console.log(`Change Color`);
    const root = document.documentElement;
    root.style.setProperty('--color1', '#B3E5FC');
    root.style.setProperty('--color2', '#37474F')
}

export const userLogout = () => window.gapi.auth2.getAuthInstance().signOut();