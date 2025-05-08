document.addEventListener("DOMContentLoaded", function() {
    document.body.style.opacity = 0;
    setTimeout(() => {
        document.body.style.transition = "opacity 1s";
        document.body.style.opacity = 1;
    }, 100);
});

function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');

    const isDark = body.classList.contains("dark-theme");

    if (isDark) {
        body.classList.remove("dark-theme");
        body.classList.add("light-theme");
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
    } else {
        body.classList.remove("light-theme");
        body.classList.add("dark-theme");
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
    }
}
