document.addEventListener('DOMContentLoaded', function() {
    const genreSelect = document.getElementById('genre');
    const yearFromSelect = document.getElementById('year-from');
    const yearToSelect = document.getElementById('year-to');
    const ratingFrom = document.getElementById('rating-from');
    const ratingTo = document.getElementById('rating-to');
    const ratingDisplay = document.getElementById('rating-display');
    const searchBtn = document.getElementById('search-btn');
    const feelingLuckyBtn = document.getElementById('feeling-lucky');
    const spinner = document.getElementById('spinner');
    const spinnerText = document.getElementById('spinner-text');
    const movieResult = document.getElementById('movie-result');
    const errorMessage = document.getElementById('error-message');
    
    let selectedRatingFrom = 0;
    let selectedRatingTo = 0;
    
    // Initialize the app
    initApp();
    
    async function initApp() {
        await loadGenres();
        populateYearDropdowns();
        setupStarRatings();
        setupEventListeners();
    }
    
    async function loadGenres() {
        try {
            const response = await fetch('/get-genres');
            const data = await response.json();
            
            data.genres.forEach(genre => {
                const option = document.createElement('option');
                option.value = genre.id;
                option.textContent = genre.name;
                genreSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error loading genres:', error);
        }
    }
    
    function populateYearDropdowns() {
        const currentYear = new Date().getFullYear();
        const startYear = 1900;
        
        for (let year = currentYear; year >= startYear; year--) {
            const optionFrom = document.createElement('option');
            optionFrom.value = year;
            optionFrom.textContent = year;
            yearFromSelect.appendChild(optionFrom.cloneNode(true));
            
            const optionTo = optionFrom.cloneNode(true);
            yearToSelect.appendChild(optionTo);
        }
    }
    
    function setupStarRatings() {
        setupSingleStarRating(ratingFrom, value => {
            selectedRatingFrom = value;
            updateRatingDisplay();
        });
        
        setupSingleStarRating(ratingTo, value => {
            selectedRatingTo = value;
            updateRatingDisplay();
        });
    }
    
    function setupSingleStarRating(container, callback) {
        const stars = container.querySelectorAll('i');
        let currentValue = 0;
        let isHalf = false;
        
        stars.forEach(star => {
            star.addEventListener('click', (e) => {
                const value = parseInt(e.target.getAttribute('data-value'));
                
                if (e.offsetX < e.target.offsetWidth / 2) {
                    currentValue = value - 0.5;
                    isHalf = true;
                } else {
                    currentValue = value;
                    isHalf = false;
                }
                
                updateStars();
                callback(currentValue);
            });
            
            star.addEventListener('mouseover', (e) => {
                const value = parseInt(e.target.getAttribute('data-value'));
                const isLeftHalf = e.offsetX < e.target.offsetWidth / 2;
                
                stars.forEach((s, index) => {
                    const sValue = index + 1;
                    
                    if (sValue < value) {
                        s.classList.add('active');
                        s.classList.remove('half');
                    } else if (sValue === value && isLeftHalf) {
                        s.classList.add('half');
                        s.classList.remove('active');
                    } else if (sValue === value && !isLeftHalf) {
                        s.classList.add('active');
                        s.classList.remove('half');
                    } else {
                        s.classList.remove('active', 'half');
                    }
                });
            });
            
            star.addEventListener('mouseout', updateStars);
        });
        
        function updateStars() {
            stars.forEach((star, index) => {
                const starValue = index + 1;
                
                if (starValue < currentValue || (!isHalf && starValue === currentValue)) {
                    star.classList.add('active');
                    star.classList.remove('half');
                } else if (starValue === currentValue && isHalf) {
                    star.classList.add('half');
                    star.classList.remove('active');
                } else {
                    star.classList.remove('active', 'half');
                }
            });
        }
    }
    
    function updateRatingDisplay() {
        ratingDisplay.textContent = `${selectedRatingFrom}-${selectedRatingTo}`;
    }
    
    function setupEventListeners() {
        searchBtn.addEventListener('click', () => {
            const filters = getFilters();
            if (validateFilters(filters)) {
                getRandomMovie(filters);
            }
        });
        
        feelingLuckyBtn.addEventListener('click', () => {
            getRandomMovie({});
        });
    }
    
    function getFilters() {
        const filters = {};
        
        const genre = genreSelect.value;
        if (genre) filters.genre = genre;
        
        const yearFrom = yearFromSelect.value;
        const yearTo = yearToSelect.value;
        if (yearFrom && yearTo) {
            filters.year_range = `${yearFrom}-${yearTo}`;
        }
        
        if (selectedRatingFrom > 0 || selectedRatingTo > 0) {
            filters.rating_range = `${selectedRatingFrom}-${selectedRatingTo}`;
        }
        
        return filters;
    }
    
    function validateFilters(filters) {
        if (filters.year_range) {
            const [from, to] = filters.year_range.split('-').map(Number);
            if (from > to) {
                showError('End year must be greater than or equal to start year');
                return false;
            }
        }
        
        if (filters.rating_range) {
            const [from, to] = filters.rating_range.split('-').map(Number);
            if (from > to) {
                showError('Max rating must be greater than or equal to min rating');
                return false;
            }
        }
        
        return true;
    }
    
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
        movieResult.classList.add('hidden');
        spinner.classList.add('hidden');
    }
    
    function clearError() {
        errorMessage.classList.add('hidden');
    }
    
    async function getRandomMovie(filters) {
        clearError();
        movieResult.classList.add('hidden');
        spinner.classList.remove('hidden');
        
        // Start spinner animation
        const fakeTitles = [
            "The Last Adventure",
            "Midnight Dreams",
            "Lost in Time",
            "The Forgotten City",
            "Eternal Sunshine",
            "Whispers in the Dark",
            "The Final Chapter"
        ];
        
        let counter = 0;
        const spinnerInterval = setInterval(() => {
            spinnerText.textContent = fakeTitles[counter % fakeTitles.length];
            counter++;
        }, 100);
        
        try {
            const response = await fetch('/get-random-movie', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(filters)
            });
            
            const data = await response.json();
            
            // Stop spinner after a minimum of 2 seconds
            setTimeout(() => {
                clearInterval(spinnerInterval);
                spinner.classList.add('hidden');
                
                if (data.success) {
                    displayMovie(data.movie);
                } else {
                    showError(data.message || 'No movies found with these filters');
                }
            }, 2000);
            
        } catch (error) {
            clearInterval(spinnerInterval);
            spinner.classList.add('hidden');
            showError('An error occurred while fetching movie data');
            console.error('Error:', error);
        }
    }
    
    function displayMovie(movie) {
        document.getElementById('movie-title').textContent = movie.title;
        
        const posterPath = movie.poster_path 
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : 'https://via.placeholder.com/500x750?text=No+Poster+Available';
        document.getElementById('movie-poster').src = posterPath;
        document.getElementById('movie-poster').alt = `${movie.title} Poster`;
        
        document.getElementById('movie-release-date').textContent = movie.release_date || 'Unknown';
        document.getElementById('movie-rating').textContent = movie.vote_average ? `${movie.vote_average}/10` : 'Not rated';
        document.getElementById('movie-overview').textContent = movie.overview || 'No overview a