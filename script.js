const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const API_SEARCH = "https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=%22";
const API_IMAGE = "https://image.tmdb.org/t/p/w1280";

const moviesContainer = document.getElementById("movies-container");
const searchEl = document.getElementById("search");
// fetch(API_URL)
//   .then((res) => res.json())
//   .then((data) => {
//     data.results.forEach((result) => {
//       console.log(result.title);
//     });
//   });

getMovies();

searchEl.addEventListener("keydown", (e) => {
  console.log(searchEl.value);
  if (e.key === "Enter") {
    search(searchEl.value);
    searchEl.value = "";
  }
});

async function getMovies() {
  const res = await fetch(API_URL);
  const data = await res.json();
  data.results.forEach((result) => {
    displayMovies(result);
  });
}

function displayMovies(movie) {
  const image = API_IMAGE + movie.poster_path;
  const title = movie.title;
  const rate = movie.vote_average;
  const summary = movie.overview;

  const movieEl = document.createElement("div");
  movieEl.classList.add("movie-item");
  movieEl.innerHTML = `
        <div class="img-container">
            <img src=${image} />
          </div>
          <div class="desc">
            <h3 id="title">${title}</h3>
            <span class="" id="rate">${rate}</span>
          </div>
          <div class="summary">
            <h4>Overview</h4>
            <p id="summary-text">
           ${summary}
            </p>
          </div>
    `;

  moviesContainer.appendChild(movieEl);
}

async function search(value) {
  moviesContainer.innerHTML = "";

  const res = await fetch(API_SEARCH + value);
  const data = await res.json();
  data.results.forEach((result) => {
    console.log(result);
    displayMovies(result);
  });
}
