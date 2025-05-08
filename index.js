document.addEventListener("DOMContentLoaded", function() {
    document.body.style.opacity = 0;
    setTimeout(() => {
        document.body.style.transition = "opacity 1s";
        document.body.style.opacity = 1;
    }, 100);
});

var darkTheme = false;

function toggleTheme() {
    var body = document.body;
    var themeIcon = document.getElementById('theme-icon');
    
    darkTheme = !darkTheme; 
    
    if (darkTheme) {
        body.classList.add("dark-theme"); 
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
    } else {
        body.classList.remove("dark-theme"); 
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
    }
}

function openSprint(sprintNumber) {
    alert("Opening Sprint " + sprintNumber);
    // 在此处添加逻辑以显示指定 Sprint 的作品
}
