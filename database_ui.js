// Full Movie database with immersive details
const movies = [
    { 
        title: "Avatar", 
        genre: "Sci-Fi", 
        duration: 162, 
        year: 2009, 
        rating: 8.2, 
        is3D: true, 
        image: "images/avatar.jpg",
        cast: "Sam Worthington, Zoe Saldana, Sigourney Weaver",
        description: "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home."
    },
    { 
        title: "Inception", 
        genre: "Sci-Fi", 
        duration: 148, 
        year: 2010, 
        rating: 8.8, 
        is3D: false, 
        image: "images/inception.jpg",
        cast: "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page",
        description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O."
    },
    { 
        title: "K-Pop Demon Hunters", 
        genre: "Urban Fantasy", 
        duration: 95, 
        year: 2025, 
        rating: 8.5, 
        is3D: true, 
        image: "images/kpdh.jpg",
        cast: "Kim Soo-hyun, Jun Ji-hyun, Park Seo-joon",
        description: "A world-renowned K-Pop group leads a double life as secret demon hunters, using their music and choreography to seal ancient rifts."
    },
    { 
        title: "Frankenstein", 
        genre: "Horror", 
        duration: 149, 
        year: 2025, 
        rating: 6.7, 
        is3D: false, 
        image: "images/frankenstein.jpg",
        cast: "Oscar Isaac, Jacob Elordi, Mia Goth",
        description: "In this modern reimagining, a brilliant but tortured scientist brings a sapient creature to life, only to face the terrifying consequences of playing God."
    },
    { 
        title: "Zootopia 2", 
        genre: "Action-Adventure", 
        duration: 110, 
        year: 2026, 
        rating: 7.2, 
        is3D: true, 
        image: "images/zootopia2.jpg",
        cast: "Ginnifer Goodwin, Jason Bateman, Ke Huy Quan",
        description: "Judy Hopps and Nick Wilde return to crack a brand new case involving mysterious reptilian visitors that turn the urban jungle upside down."
    },
    { 
        title: "The Batman", 
        genre: "Action-Adventure", 
        duration: 176, 
        year: 2022, 
        rating: 7.8, 
        is3D: false, 
        image: "images/batman.jpg",
        cast: "Robert Pattinson, Zoë Kravitz, Paul Dano",
        description: "Batman ventures into Gotham City's underworld when a sadistic killer leaves behind a trail of cryptic clues."
    },
    { 
        title: "Interstellar", 
        genre: "Sci-Fi", 
        duration: 169, 
        year: 2014, 
        rating: 8.7, 
        is3D: false, 
        image: "images/interstellar.jpg",
        cast: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival as Earth faces a global famine."
    },
    { 
        title: "Scream VI", 
        genre: "Horror", 
        duration: 122, 
        year: 2023, 
        rating: 6.5, 
        is3D: false, 
        image: "images/scream.jpg",
        cast: "Melissa Barrera, Jenna Ortega, Courteney Cox",
        description: "Four survivors of the Ghostface murders leave Woodsboro behind for a fresh start in New York City, only to find a new killer embarking on a rampage."
    },
    { 
        title: "Dune: Part Two", 
        genre: "Sci-Fi", 
        duration: 166, 
        year: 2024, 
        rating: 8.9, 
        is3D: false, 
        image: "images/dune.jpg",
        cast: "Timothée Chalamet, Zendaya, Rebecca Ferguson",
        description: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family."
    },
    { 
        title: "Spider-Verse", 
        genre: "Action-Adventure", 
        duration: 140, 
        year: 2023, 
        rating: 8.7, 
        is3D: true, 
        image: "images/spiderverse.jpg",
        cast: "Shameik Moore, Hailee Steinfeld, Oscar Isaac",
        description: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence."
    }
];

// Existing DOM elements
const heroCarousel = document.getElementById('heroCarousel');
const heroDots = document.getElementById('heroDots');
const featuredGrid = document.getElementById('featuredGrid');
const allMoviesGrid = document.getElementById('allMoviesGrid');
const categoryButtons = document.querySelectorAll('.category-btn');
const navLinks = document.querySelectorAll('.nav-link'); 

// Target the new overlapping overlay
const movieDetailOverlay = document.getElementById('movieDetailOverlay');
const closeDetail = document.getElementById('closeDetail');

let currentHeroSlide = 0;
let heroTimer;

/**
 * Renders the Hero Carousel
 */
function initHeroCarousel() {
    if (!heroCarousel) return;
    const heroMovies = [...movies].sort((a, b) => b.rating - a.rating).slice(0, 3);
    
    heroCarousel.innerHTML = heroMovies.map((movie, index) => `
        <div class="hero-slide ${index === 0 ? 'active' : ''}" style="background-image: url('${movie.image}')">
            <div class="hero-overlay"></div>
            <div class="hero-content">
                <div class="hero-meta">
                    <span>${movie.year}</span>
                    <span>⭐ ${movie.rating}</span>
                    ${movie.is3D ? '<span class="three-d-badge">3D AVAILABLE</span>' : ''}
                </div>
                <h2>${movie.title}</h2>
                <p class="hero-description">${movie.description}</p>
                <div class="hero-btns">
                    <button class="btn-watch">▶ Play Now</button>
                    <button class="btn-info" onclick="openMovieDetails('${movie.title.replace(/'/g, "\\'")}')">ⓘ More Info</button>
                </div>
            </div>
        </div>
    `).join('');

    if (heroDots) {
        heroDots.innerHTML = heroMovies.map((_, index) => `
            <div class="dot ${index === 0 ? 'active' : ''}" onclick="goToHeroSlide(${index})"></div>
        `).join('');
    }

    startHeroTimer();
}

function startHeroTimer() {
    clearInterval(heroTimer);
    heroTimer = setInterval(() => {
        nextHeroSlide();
    }, 5000); 
}

function nextHeroSlide() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    
    if(slides.length === 0) return;

    slides[currentHeroSlide].classList.remove('active');
    dots[currentHeroSlide].classList.remove('active');
    
    currentHeroSlide = (currentHeroSlide + 1) % slides.length;
    
    slides[currentHeroSlide].classList.add('active');
    dots[currentHeroSlide].classList.add('active');
}

function goToHeroSlide(index) {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides[currentHeroSlide]) slides[currentHeroSlide].classList.remove('active');
    if (dots[currentHeroSlide]) dots[currentHeroSlide].classList.remove('active');
    
    currentHeroSlide = index;
    
    if (slides[currentHeroSlide]) slides[currentHeroSlide].classList.add('active');
    if (dots[currentHeroSlide]) dots[currentHeroSlide].classList.add('active');
    startHeroTimer(); 
}

/**
 * Creates HTML for a movie card. 
 */
function createMovieCard(movie, index = null) {
    const rankHTML = index !== null ? `<div class="rank-number">${index + 1}</div>` : '';
    
    return `
        <div class="movie-card" tabindex="0" onclick="openMovieDetails('${movie.title.replace(/'/g, "\\'")}')">
            ${rankHTML}
            <div class="movie-card-content">
                <div class="movie-poster-container">
                    <img src="${movie.image}" alt="${movie.title}" loading="lazy" onerror="this.src='https://via.placeholder.com/200x300?text=No+Poster'">
                    <div class="recently-added-tag" style="position: absolute; bottom: 10px; left: 10px; background: #ff3333; color: white; padding: 2px 8px; font-size: 0.7rem; border-radius: 4px; font-weight: bold;">Recently Added</div>
                </div>
                
                <h3 class="movie-title">${movie.title}</h3>
                
                <div class="movie-details-extra">
                    <p>
                        <strong>Genre:</strong> ${movie.genre}<br>
                        <strong>Duration:</strong> ${movie.duration}m<br>   
                        <strong>Release:</strong> ${movie.year}<br>
                        <strong>Rating:</strong> ⭐ ${movie.rating}
                    </p>
                    ${movie.is3D ? '<span class="three-d-badge">3D</span>' : ''}
                </div>
            </div>
        </div>
    `;
}

/**
 * Renders the UI sections
 */
function renderPage(moviesToRender = movies) {
    if (featuredGrid) {
        featuredGrid.innerHTML = movies.slice(0, 5).map(m => createMovieCard(m)).join('');
        featuredGrid.scrollLeft = 0; 
    }

    if (allMoviesGrid) {
        // Here we pass the index to createMovieCard so Top 10 numbers appear correctly
        allMoviesGrid.innerHTML = moviesToRender.slice(0, 10).map((m, i) => createMovieCard(m, i)).join('');
        allMoviesGrid.scrollTo({ left: 0, behavior: 'auto' }); 
    }

    document.querySelectorAll('.movie-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.05}s`;
    });
}

/**
 * Filter Logic for Categories
 */
function filterMovies(category) {
    const mainGenres = ['sci-fi', 'horror', 'action-adventure', 'urban fantasy'];
    let filtered;

    if (category === 'all' || category === 'movies') {
        filtered = movies;
    } else if (category === 'others') {
        filtered = movies.filter(movie => {
            const movieGenre = movie.genre.toLowerCase();
            const isMain = mainGenres.some(main => movieGenre.includes(main));
            return !isMain;
        });
    } else if (category === '3d movies') {
        filtered = movies.filter(movie => movie.is3D === true);
    } else if (category === 'new releases') {
        filtered = movies.filter(movie => movie.year >= 2025);
    } else if (category === 'top rated') {
        filtered = movies.filter(movie => movie.rating >= 8.5);
    } else {
        filtered = movies.filter(movie => 
            movie.genre.toLowerCase().includes(category.toLowerCase())
        );
    }
    renderPage(filtered);
}

// Category Events
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        filterMovies(button.getAttribute('data-filter'));
    });
});

// Persistent Header Nav Events
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const filterType = link.textContent.toLowerCase();
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        filterMovies(filterType);
        navLinks.forEach(l => l.style.color = '#cccccc');
        link.style.color = '#ff3333';
    });
});

/**
 * Full Search System
 */
const searchBtn = document.querySelector('.search-btn');
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        const term = prompt('Search movies or genres:');
        if (term && term.trim()) {
            const results = movies.filter(m => 
                m.title.toLowerCase().includes(term.toLowerCase()) ||
                m.genre.toLowerCase().includes(term.toLowerCase())
            );
            
            if (results.length > 0) {
                renderPage(results);
                categoryButtons.forEach(btn => btn.classList.remove('active'));
            } else {
                showToast(`No matches found for "${term}"`);
            }
        }
    });
}

/**
 * Opens the immersive detail view
 * Updates the overlay with Netflix-style info grid data
 */
function openMovieDetails(movieTitle) {
    const movie = movies.find(m => m.title === movieTitle);
    if (!movie || !movieDetailOverlay) return;

    // Fill Banner and Title
    const detailBanner = document.getElementById('detailBanner');
    const detailTitle = document.getElementById('detailTitle');
    if (detailBanner) detailBanner.style.backgroundImage = `url('${movie.image}')`;
    if (detailTitle) detailTitle.textContent = movie.title;

    // Fill Meta Data
    const detailYear = document.getElementById('detailYear');
    const detailDuration = document.getElementById('detailDuration');
    const detailRating = document.getElementById('detailRating');
    if (detailYear) detailYear.textContent = movie.year;
    if (detailDuration) detailDuration.textContent = `${movie.duration}m`;
    if (detailRating) detailRating.textContent = `${movie.rating}/10`;

    // Fill Main Description
    const detailDescription = document.getElementById('detailDescription');
    if (detailDescription) detailDescription.textContent = movie.description;

    // Fill Sidebar info (Cast & Genre)
    const detailCast = document.getElementById('detailCast');
    const detailGenre = document.getElementById('detailGenre');
    if (detailCast) detailCast.textContent = movie.cast;
    if (detailGenre) detailGenre.textContent = movie.genre;

    // Show Overlay and disable background scroll
    movieDetailOverlay.style.display = "block";
    document.body.style.overflow = "hidden"; 
}

// Close overlay logic
if (closeDetail) {
    closeDetail.onclick = () => {
        movieDetailOverlay.style.display = "none";
        document.body.style.overflow = "auto";
    };
}

// Close when clicking outside the container (on the backdrop)
window.onclick = (event) => {
    if (event.target == movieDetailOverlay) {
        movieDetailOverlay.style.display = "none";
        document.body.style.overflow = "auto";
    }
};

/**
 * Toast Notification Logic
 */
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification'; 
    toast.style.cssText = `
        position: fixed; bottom: 30px; right: 20px;
        background: #ff3333; color: white;
        padding: 12px 24px; border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        z-index: 10000; font-weight: 600;
        transition: opacity 0.5s ease;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// Notification Button logic
const notifyBtn = document.querySelector('.notification-btn');
if (notifyBtn) {
    notifyBtn.addEventListener('click', () => {
        const msgs = ["New Sci-Fi releases!", "Watchlist updated.", "3D mode optimized."];
        showToast(msgs[Math.floor(Math.random() * msgs.length)]);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    renderPage();
    initHeroCarousel(); 
});