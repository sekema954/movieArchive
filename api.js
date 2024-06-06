async function getResults() {
    const searchInput = document.querySelector(".search-div");
    const searchValue = searchInput.value.trim(); // Trim whitespace from the search value
    const url = `https://api.jikan.moe/v4/anime?q=${searchValue}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const request = await fetch(url, options);
        const result = await request.json();

        const movieWrapper = document.querySelector(".movie-card-wrapper"); 
        movieWrapper.innerHTML = "";    

        for (const movie of result.data) {
            const movieBox = document.createElement('div');
            movieBox.classList.add('movie-card');

            const movieIcon = document.createElement('div');
            movieIcon.classList.add('movie-bg');
            const movieImg = document.createElement('img');
            
            const imageUrl = movie.images && movie.images.webp && movie.images.webp.large_image_url;
            movieImg.src = imageUrl || 'placeholder.jpg'; // Fallback image

            movieIcon.appendChild(movieImg);
            movieBox.appendChild(movieIcon);
            
            movieWrapper.appendChild(movieBox);

            movieBox.addEventListener('click', () => {
                const mainTitle = document.querySelector('.title-fetch');
                mainTitle.innerHTML = movie.title;

                const sypnosis = document.querySelector(".sypnosis-fetch");
                sypnosis.innerHTML = movie.synopsis;

                const dateString = movie.aired.from;
                const parts = dateString.split("-");
                const year = parts[0];

                const airedYear = document.querySelector(".aired-fetch");
                airedYear.innerHTML = year;

                const episodes = document.querySelector(".episode-fetch");
                episodes.innerHTML = movie.episodes === null ? "Still releasing." : movie.episodes;

                const posterBg = document.querySelector(".poster-fetch");
                posterBg.src = imageUrl;

                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });

                const type = document.querySelector(".type-fetch");
                type.innerHTML = movie.type;

                const overviewContainer = document.querySelector(".overview");
                overviewContainer.style.background = `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${imageUrl})`;
                overviewContainer.style.backgroundPosition = 'center';
                overviewContainer.style.backgroundSize = 'cover';
                overviewContainer.style.backgroundRepeat = 'no-repeat';

                // Set up the trailer button click event
                const trailerBtn = document.querySelector('.trailer-fetch');
                trailerBtn.addEventListener("click", (event) => {
                    event.preventDefault();
                    if (movie.trailer && movie.trailer.embed_url) {
                        window.open(movie.trailer.embed_url, '_blank'); // Open trailer in a new tab
                    } else {
                        alert("Trailer not available");
                        // Provide feedback to the user that the trailer is not available
                    }
                });
            });
        }
    } catch(error) {
        console.error(error);
        // Display an error message to the user
    }
};
getResults();



function preventFunction(){
    const trailerEl = document.getElementById('fetch-trailer');
    trailerEl.addEventListener('click', (event)=>{
        event.preventDefault();
    });
};