document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }

    // Lazy loading for images
    const images = document.querySelectorAll('img.lazy');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    image.classList.remove('lazy');
                    imageObserver.unobserve(image);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }

    // Add "Read More" functionality
    const readMoreLinks = document.querySelectorAll('.read-more');
    readMoreLinks.forEach(link => {
        link.addEventListener('click', showFullPost);
    });

    // Handle comment submissions
    const commentForms = document.querySelectorAll('.comment-form');
    commentForms.forEach(form => {
        form.addEventListener('submit', handleCommentSubmit);
    });
});

function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    const headerOffset = 100;
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    const emailInput = this.querySelector('input[type="email"]');
    const email = emailInput.value;
    
    // Here you would typically send the email to your server
    // For this example, we'll just log it to the console
    console.log(`Newsletter subscription for: ${email}`);
    
    // Clear the input and show a success message
    emailInput.value = '';
    alert('Thank you for subscribing to our newsletter!');
}

function showFullPost(e) {
    e.preventDefault();
    const post = this.closest('.post');
    const content = post.querySelector('p');
    
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
        this.textContent = 'Read More';
    } else {
        content.style.maxHeight = content.scrollHeight + 'px';
        this.textContent = 'Read Less';
    }
}

function handleCommentSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const nameInput = form.querySelector('input[name="name"]');
    const commentInput = form.querySelector('textarea[name="comment"]');
    const name = nameInput.value;
    const comment = commentInput.value;
    
    if (name && comment) {
        const commentsList = form.closest('.comment-section').querySelector('.comments-list');
        const newComment = document.createElement('li');
        newComment.innerHTML = `<strong>${name}</strong>: ${comment}`;
        commentsList.appendChild(newComment);
        
        // Clear the form
        nameInput.value = '';
        commentInput.value = '';
    }
}

// Function to simulate fetching more posts (for demonstration purposes)
function loadMorePosts() {
    const postGrid = document.querySelector('.post-grid');
    const newPost = document.createElement('article');
    newPost.classList.add('post');
    newPost.innerHTML = `
        <img src="https://via.placeholder.com/800x600" alt="New Post" class="lazy" data-src="https://via.placeholder.com/800x600">
        <h3>New Technology Trends</h3>
        <div class="meta">By Jane Smith | ${new Date().toLocaleDateString()}</div>
        <p>Exploring the latest technology trends shaping our future...</p>
        <a href="#" class="read-more">Read More</a>
        <div class="comment-section">
            <h4>Comments</h4>
            <ul class="comments-list"></ul>
            <form class="comment-form">
                <input type="text" name="name" placeholder="Your Name" required>
                <textarea name="comment" placeholder="Your Comment" required></textarea>
                <button type="submit">Submit Comment</button>
            </form>
        </div>
    `;
    postGrid.appendChild(newPost);
    
    // Reattach event listeners to new elements
    newPost.querySelector('.read-more').addEventListener('click', showFullPost);
    newPost.querySelector('.comment-form').addEventListener('submit', handleCommentSubmit);
}

// Add a scroll event listener to implement infinite scrolling
window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
        loadMorePosts();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // ... (previous code remains the same) ...

    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', performSearch);

    // Social sharing
    const shareButtons = document.querySelectorAll('.share-btn');
    shareButtons.forEach(button => {
        button.addEventListener('click', shareBlogPost);
    });

    // Category filtering
    const categoryLinks = document.querySelectorAll('.category-list a');
    categoryLinks.forEach(link => {
        link.addEventListener('click', filterByCategory);
    });

    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', validateForm);
    });
});



function performSearch() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const posts = document.querySelectorAll('.post');
    
    posts.forEach(post => {
        const title = post.querySelector('h3').textContent.toLowerCase();
        const content = post.querySelector('p').textContent.toLowerCase();
        const tags = Array.from(post.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
        
        if (title.includes(searchTerm) || content.includes(searchTerm) || tags.some(tag => tag.includes(searchTerm))) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
}

function shareBlogPost(e) {
    const platform = e.target.closest('.share-btn').dataset.platform;
    const postTitle = e.target.closest('.post').querySelector('h3').textContent;
    const postUrl = window.location.href;
    
    let shareUrl;
    switch (platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(postTitle)}&url=${encodeURIComponent(postUrl)}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(postTitle)}`;
            break;
    }
    
    window.open(shareUrl, '_blank');
}

function filterByCategory(e) {
    e.preventDefault();
    const category = e.target.dataset.category;
    const posts = document.querySelectorAll('.post');
    
    posts.forEach(post => {
        const tags = post.dataset.tags.split(',');
        if (tags.includes(category)) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
}

function validateForm(e) {
    const form = e.target;
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.checkValidity()) {
            isValid = false;
            showValidationError(input);
        } else {
            clearValidationError(input);
        }
    });

    if (!isValid) {
        e.preventDefault();
    }
}

function showValidationError(input) {
    const errorMessage = input.validationMessage;
    let errorElement = input.nextElementSibling;
    
    if (!errorElement || !errorElement.classList.contains('error-message')) {
        errorElement = document.createElement('div');
        errorElement.classList.add('error-message');
        input.parentNode.insertBefore(errorElement, input.nextSibling);
    }
    
    errorElement.textContent = errorMessage;
    errorElement.style.color = '#ff4136';
    errorElement.style.fontSize = '0.8rem';
    errorElement.style.marginTop = '5px';
}

function clearValidationError(input) {
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.remove();
    }
}

// Function to load more posts (for infinite scrolling)
function loadMorePosts() {
    const postGrid = document.querySelector('.post-grid');
    const newPost = document.createElement('article');
    newPost.classList.add('post');
    newPost.dataset.tags = 'technology,innovation';
    newPost.innerHTML = `
        <img src="https://via.placeholder.com/800x600" alt="Tech Innovation" class="lazy" data-src="https://via.placeholder.com/800x600">
        <h3>Emerging Technologies Shaping Our Future</h3>
        <div class="meta">By Alex Johnson | ${new Date().toLocaleDateString()}</div>
        <p>Exploring cutting-edge technologies that are set to revolutionize various aspects of our lives...</p>
        <a href="#" class="read-more">Read More</a>
        <div class="tags">
            <span class="tag">Technology</span>
            <span class="tag">Innovation</span>
        </div>
        <div class="social-share">
            <button class="share-btn" data-platform="facebook"><i class="fab fa-facebook-f"></i></button>
            <button class="share-btn" data-platform="twitter"><i class="fab fa-twitter"></i></button>
            <button class="share-btn" data-platform="linkedin"><i class="fab fa-linkedin-in"></i></button>
        </div>
        <div class="comment-section">
            <h4>Comments</h4>
            <ul class="comments-list"></ul>
            <form class="comment-form">
                <input type="text" name="name" placeholder="Your Name" required>
                <input type="email" name="email" placeholder="Your Email" required>
                <textarea name="comment" placeholder="Your Comment" required></textarea>
                <button type="submit">Submit Comment</button>
            </form>
        </div>
    `;
    postGrid.appendChild(newPost);
    
    // Reattach event listeners to new elements
    newPost.querySelector('.read-more').addEventListener('click', showFullPost);
    newPost.querySelector('.comment-form').addEventListener('submit', handleCommentSubmit);
    newPost.querySelectorAll('.share-btn').forEach(btn => btn.addEventListener('click', shareBlogPost));
}

// Infinite scrolling
window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
        loadMorePosts();
    }
});

// Animation for new posts
function animateNewPosts() {
    const posts = document.querySelectorAll('.post');
    posts.forEach((post, index) => {
        post.style.animation = `fadeIn 0.5s ease-in ${index * 0.1}s`;
    });
}

// Call this function after loading new posts or filtering
animateNewPosts();