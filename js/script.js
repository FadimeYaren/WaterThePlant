function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
    // Logo changing
    const logo = document.getElementById("logo");
    if (document.body.classList.contains('dark-mode')) {
        logo.src = "img/general/logowhite.png"; // white logo for dark mode
    } else {
        logo.src = "img/general/logoblack.png"; // black logo for light mode
    }
}
