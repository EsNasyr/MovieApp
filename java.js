const API_KEY = "8c8e1a50-6322-4135-8875-5d40a5420d86";
const API_URL_POPULAR =
    "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH =
    "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const API_INFO =
    "https://kinopoiskapiunofficial.tech/api/v2.2/films/";
getMovies(API_URL_POPULAR);
getInfo(API_INFO);


async function getMovies(url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
        },
    });
    const respData = await resp.json();
    showMovies(respData);
}
async function getInfo(url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
        },
    });
    const respData = await resp.json();
    showMovies(respData);
}



function getClassByRate(vote) {
    if (vote >= 7) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else if (vote < 5) {
        return "red";
    }
}

function showMovies(data) {
    const moviesEL = document.querySelector('.movies');

    document.querySelector('.movies').innerHTML = ""

    data.films.forEach((movie) => {
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML = `
        <div class="movie__cover-inner">
            <img src="${movie.posterUrlPreview}" alt="${movie.nameRu}" class="movie__cover">
            <div class="movie__cover-darkened"></div>
        </div>
        <div class="movie-info">
            <div class="movie-title">${movie.nameRu}</div>
            <div class="movie-category">${movie.genres.map((genre) => ` ${genre.genre}`)}</div>
            ${movie.rating && `
            <div class="movie-average movie-average--${getClassByRate(movie.rating)}">${movie.rating}</div>
            <div class="modal_window">
            
            </div>
            `}
        </div>
        `;
        
        moviesEL.appendChild(movieEl);
    })
}
const form = document.querySelector('form')
const search = document.querySelector('.header__search')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const apiSearchUrl = `${API_URL_SEARCH}${search.value}`
    if (search.value) {
        getMovies(apiSearchUrl)
    }
})