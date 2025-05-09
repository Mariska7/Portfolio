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

document.addEventListener("DOMContentLoaded", function() {
    displayPosts();
});

function addPost() {
    const postText = document.getElementById('post-text').value;
    const postImages = document.getElementById('post-image').files;

    if (!postText && postImages.length === 0) return;

    const postsContainer = document.getElementById('posts');
    const newPost = document.createElement('div');
    newPost.classList.add('blog-post');

    const senderAvatar = 'Foto/Avatar.jpg';
    const senderName = 'Mariska Ye';
    const postTime = new Date().toLocaleString();

    let postContent = `
        <div class="post-header">
            <img src="${senderAvatar}" alt="Avatar" class="post-avatar">
            <span class="post-name">${senderName}</span>
            <span class="post-time">${postTime}</span>
            <div class="post-menu">
                <i class="fas fa-ellipsis-v" onclick="toggleMenu(this)"></i>
                <div class="post-menu-content" style="display: none;">
                    <button class="edit-button" onclick="editPost(this)">Edit</button>
                    <button class="delete-button" onclick="deletePost(this)">Delete</button>
                    <button class="pin-button" onclick="pinPost(this)">Pin</button>
                    <button class="unpin-button" onclick="unpinPost(this)" style="display: none;">Unpin</button>
                </div>
            </div>
        </div>
        <p>${postText}</p>
    `;

    if (postImages.length > 0) {
        Array.from(postImages).forEach(image => {
            const reader = new FileReader();
            reader.onload = function(e) {
                postContent += `<img src="${e.target.result}" alt="Post Image" class="post-image">`;
                newPost.innerHTML = postContent;
                postsContainer.insertBefore(newPost, postsContainer.firstChild);
                savePost(postText, e.target.result, postTime);
            };
            reader.readAsDataURL(image);
        });
    } else {
        newPost.innerHTML = postContent;
        postsContainer.insertBefore(newPost, postsContainer.firstChild);
        savePost(postText, null, postTime);
    }

    document.getElementById('post-text').value = '';
    document.getElementById('post-image').value = '';
}

function savePost(text, image = null, time) {
    let savedPosts = localStorage.getItem('posts');
    savedPosts = savedPosts ? JSON.parse(savedPosts) : [];

    savedPosts.push({ text, image, time, pinned: false });
    localStorage.setItem('posts', JSON.stringify(savedPosts));
}

function displayPosts() {
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';

    let savedPosts = localStorage.getItem('posts');
    savedPosts = savedPosts ? JSON.parse(savedPosts) : [];

    savedPosts.sort((a, b) => b.pinned - a.pinned);

    savedPosts.forEach((post, index) => {
        const newPost = document.createElement('div');
        newPost.classList.add('blog-post');

        const senderAvatar = 'Foto/Avatar.jpg';
        const senderName = 'Mariska Ye';

        let postContent = `
            <div class="post-header">
                <img src="${senderAvatar}" alt="Avatar" class="post-avatar">
                <span class="post-name">${senderName}</span>
                <span class="post-time">${post.time}</span>
                <div class="post-menu">
                    <i class="fas fa-ellipsis-v" onclick="toggleMenu(this)"></i>
                    <div class="post-menu-content" style="display: none;">
                        <button class="edit-button" onclick="editPost(this)">Edit</button>
                        <button class="delete-button" onclick="deletePost(this)">Delete</button>
                        <button class="pin-button" onclick="pinPost(this)" style="display: ${post.pinned ? 'none' : 'block'};">Pin</button>
                        <button class="unpin-button" onclick="unpinPost(this)" style="display: ${post.pinned ? 'block' : 'none'};">Unpin</button>
                    </div>
                </div>
            </div>
            <p>${post.text}</p>
        `;

        if (post.image) {
            postContent += `<img src="${post.image}" alt="Post Image" class="post-image">`;
        }

        newPost.innerHTML = postContent;
        postsContainer.appendChild(newPost);
    });
}

function deletePost(button) {
    const post = button.closest('.blog-post');
    const postIndex = Array.from(post.parentElement.children).indexOf(post);

    let savedPosts = localStorage.getItem('posts');
    savedPosts = savedPosts ? JSON.parse(savedPosts) : [];
    
    savedPosts.splice(postIndex, 1);
    localStorage.setItem('posts', JSON.stringify(savedPosts));

    post.remove(); 
}

function editPost(button) {
    const post = button.closest('.blog-post');
    const postText = post.querySelector('p').textContent;
    const newText = prompt('Edit your post:', postText);
    if (newText !== null) {
        post.querySelector('p').textContent = newText;

        const postIndex = Array.from(post.parentElement.children).indexOf(post);
        let savedPosts = localStorage.getItem('posts');
        savedPosts = savedPosts ? JSON.parse(savedPosts) : [];
        savedPosts[postIndex].text = newText;

        localStorage.setItem('posts', JSON.stringify(savedPosts));
    }
}

function pinPost(button) {
    const post = button.closest('.blog-post');
    const postIndex = Array.from(post.parentElement.children).indexOf(post);

    let savedPosts = localStorage.getItem('posts');
    savedPosts = savedPosts ? JSON.parse(savedPosts) : [];

    savedPosts[postIndex].pinned = true;

    const pinButton = post.querySelector('.pin-button');
    const unpinButton = post.querySelector('.unpin-button');
    pinButton.style.display = 'none';
    unpinButton.style.display = 'block';

    localStorage.setItem('posts', JSON.stringify(savedPosts));
}

function unpinPost(button) {
    const post = button.closest('.blog-post');
    const postIndex = Array.from(post.parentElement.children).indexOf(post);

    let savedPosts = localStorage.getItem('posts');
    savedPosts = savedPosts ? JSON.parse(savedPosts) : [];

    savedPosts[postIndex].pinned = false;

    const pinButton = post.querySelector('.pin-button');
    const unpinButton = post.querySelector('.unpin-button');
    pinButton.style.display = 'block';
    unpinButton.style.display = 'none';

    localStorage.setItem('posts', JSON.stringify(savedPosts));
}

function toggleMenu(button) {
    const menuContent = button.closest('.post-menu').querySelector('.post-menu-content');
    const allMenus = document.querySelectorAll('.post-menu-content');

    // Hide all menus
    allMenus.forEach(menu => {
        if (menu !== menuContent) {
            menu.style.display = 'none';
        }
    });

    // Toggle current menu visibility
    menuContent.style.display = menuContent.style.display === 'block' ? 'none' : 'block';
}
