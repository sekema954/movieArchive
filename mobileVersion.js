getMobileResults();

async function getMobileResults() {
    const searchInput = document.querySelector(".mobile-search-div");
    const searchValue = searchInput.value;
    const url = `https://api.jikan.moe/v4/anime?q=${searchValue}`;
    const options = {
        method: 'GET',
        header: ''
    }

    try {
        console.clear();
        const request = await fetch(url, options);
        const result = await request.json();
        console.log(result);

        // Select and clear movie wrapper
        const movieWrapper = document.querySelector(".movie-card-wrapper"); 
        movieWrapper.innerHTML = "";    
        

        // Loop over the results and create movie cards for each result
        for (const movie of result.data) {
            const movieBox = document.createElement('div');
            movieBox.classList.add('movie-card');

            // Movie poster
            const movieIcon = document.createElement('div');
            movieIcon.classList.add('movie-bg');
            const movieImg = document.createElement('img');

            // Access the image URL based on the actual structure of the API response
            const imageUrl = movie.images && movie.images.webp && movie.images.webp.large_image_url;
            if (imageUrl) {
                movieImg.src = imageUrl;
            } else {
                // If the image URL is not available, provide a fallback image
                movieImg.src = '';
            }

            movieIcon.appendChild(movieImg);
            movieBox.appendChild(movieIcon);
            
            // Append the movieBox to the movieWrapper
            movieWrapper.appendChild(movieBox);

            movieImg.addEventListener('click', () => {
                // Handle the click event here, for example, display a message
                console.log(`you clicked on ${movie.title}`)
                //change movie title
                const mainTitle = document.querySelector('.title-fetch');
                mainTitle.innerHTML = movie.title;

                //movie sypnosis
                const sypnosis = document.querySelector(".sypnosis-fetch");
                sypnosis.innerHTML = movie.synopsis;

                //convert year-month-day-time to year
                const dateString = movie.aired.from;
                const parts = dateString.split("-");
                const year = parts[0];
                console.log(`Year: ${year}`);

                //update aired year
                const airedYear = document.querySelector(".aired-fetch");
                airedYear.innerHTML = year;

                //show number of episodes
                const episodes = document.querySelector(".episode-fetch");
                if(movie.episodes === null) {
                    episodes.innerHTML = "Still releasing."
                } else {
                    episodes.innerHTML = movie.episodes;
                    console.log(`This show has ${movie.episodes} episodes.`)
                };
               
                



                //watch trailer
                const trailerURL = movie.trailer.embed_url;
                const trailerBtn = document.querySelector('.trailer-fetch');

                //add click event to trialer btn
                trailerBtn.addEventListener("click", (event)=>{
                    event.preventDefault();
                    if(trailerURL === 'null') {
                        alert("No trailer links found!");
                    } else {
                        window.open(trailerURL, '_blank');
                        console.log(`You clicked on ${trailerURL}`);
                    }
                });

                //change background
                const posterBg = document.querySelector(".poster-fetch");
                posterBg.src = imageUrl;

                //scrollTop
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });


                //type fetch
                const type = document.querySelector(".type-fetch");
                type.innerHTML = movie.type;


                //change overview main background
                const overviewContainer = document.querySelector(".overview");
                overviewContainer.style.background = `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${imageUrl})`;
                overviewContainer.style.backgroundPosition = 'center';
                overviewContainer.style.backgroundSize = 'cover';
                overviewContainer.style.backgroundRepeat = 'no-repeat';
            });
        }

        

    } catch(error) {
        console.error(error);
    }

};
