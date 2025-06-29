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

function addPost() {
    const postText = document.getElementById('post-text').value;
    const postImage = document.getElementById('post-image').files[0];

    const postsContainer = document.getElementById('posts');
    const newPost = document.createElement('div');
    newPost.classList.add('blog-post');

    if (postText) {
        const postContent = document.createElement('p');
        postContent.textContent = postText;
        newPost.appendChild(postContent);
    }

    if (postImage) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const postImg = document.createElement('img');
            postImg.src = e.target.result;
            newPost.appendChild(postImg);
        };
        reader.readAsDataURL(postImage);
    }

    postsContainer.insertBefore(newPost, postsContainer.firstChild);

    document.getElementById('post-text').value = '';
    document.getElementById('post-image').value = '';
}

let currentSection = 0;
const sections = document.querySelectorAll('.cover-container, .content-section');

document.addEventListener('wheel', (event) => {
    if (event.deltaY > 0) {

        if (currentSection < sections.length - 1) {
            currentSection++;
            scrollToSection(currentSection);
        }
    } else {
        if (currentSection > 0) {
            currentSection--;
            scrollToSection(currentSection);
        }
    }
});

function scrollToSection(sectionIndex) {
    sections.forEach((section, index) => {
        if (index === sectionIndex) {
            section.style.transform = 'translateY(0)';
        } else if (index < sectionIndex) {
            section.style.transform = 'translateY(-100vh)';
        } else {
            section.style.transform = 'translateY(100vh)';
        }
    });
}

document.getElementById('envelope').addEventListener('click', function() {

    this.classList.add('open');

    setTimeout(function() {
        document.getElementById('cv').classList.add('show');
    }, 1000); 
});
