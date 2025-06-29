document.addEventListener("DOMContentLoaded", function() {
    document.body.style.opacity = 0;
    
    setTimeout(() => {
        document.body.style.transition = "opacity 1s";
        document.body.style.opacity = 1;
    }, 100);

    const searchInput = document.getElementById('searchInput');
    const portfolioImages = document.querySelectorAll('.portfolio-image');

    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const searchTerm = searchInput.value.toLowerCase(); 
            let projectFound = false;

            portfolioImages.forEach(function(image) {
                const title = image.getAttribute('data-title').toLowerCase();

                if (title.includes(searchTerm)) {
                    openProjectModal(
                        image.getAttribute('data-title'),
                        image.getAttribute('data-description'),  
                        image.src,
                        image.getAttribute('data-link')  
                    );
                    projectFound = true;
                }
            });

            if (!projectFound) {
                alert("No matching project found.");
            }
        }
    });
});

function openProjectModal(title, description, imageUrl, linkUrl) {
    var modal = document.createElement('div');
    modal.classList.add('modal');

    var modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    modalContent.innerHTML = `
        <div class="modal-image">
            <img src="${imageUrl}" alt="${title}">
        </div>
        <h2>${title}</h2>
        <p>${description}</p>
        <a href="${linkUrl}" target="_blank" class="project-link">Visit Project</a>
    `;

    modal.appendChild(modalContent);

    document.body.appendChild(modal);

    modal.style.display = "block";

    document.body.style.overflow = "hidden";

    modal.onclick = function(event) {
        if (event.target === modal) {
            closeProjectModal(modal);
        }
    };
}

function closeProjectModal(modal) {
    if (modal) {
        modal.classList.add('closing');
        setTimeout(() => {
            modal.style.display = "none";
            modal.remove();
            document.body.style.overflow = "auto";
        }, 300); 
    }
}
