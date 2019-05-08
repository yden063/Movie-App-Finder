'use strict';

$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    e.preventDefault();
    let searchText = $('#searchText').val();

    // Retrieving the movies
    getMovies(searchText)
      .then((movies) => {
        // Removing the previous elements
        $('#movies').empty();
        console.log(movies);

        // Displaying the movies 
        $.each(movies, (index, movie) => {
          let output = `
            <div class='col-md-3'>
              <div class='well text-center'>
                <img class='poster' src='${movie.Poster}'>
                <h5>${movie.Title}</h5>
                <a onclick='movieDetails("${movie.imdbID}")'>
                  <button type="button" class="btn btn-secondary">Details</button>
                </a>
              </div>
            </div>
          `;

          $('#movies').append(output);
        });
      });
  });
});

function getMovies(searchText) {
  // Construct the parameters URL
  const paramsURL = `s=${searchText}`;

  // API call
  let results = apiGET(paramsURL)
    .then((response) => {
      return response.Search;
    });

  return results;
}

function getMovie() {
  // Get the movie id from session storage
  let movieId = sessionStorage.getItem('imdbID');

  // Construct the parameters URL
  const paramsURL = `i=${movieId}`;

  // API call
  let result = apiGET(paramsURL)
    .then((movie) => {
      console.log(movie);

      let output = `
        <div class='jumbotron'>
          <div class='row'>
            <div class='col-md-4'>
              <img class='poster' src='${movie.Poster}' />
            </div>
            <div class='col-md-8'>
              <h2>${movie.Title}</h2>
              <ul class='list-group'>
                <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                <li class="list-group-item"><strong>Runtime:</strong> ${movie.Runtime}</li>
                <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                <li class="list-group-item"><strong>Language:</strong> ${movie.Language}</li>`
                
                $.each(movie.Ratings, (index, value) => {
                  console.log(value.Source)
                  if(value.Source == 'Rotten Tomatoes') {
                    output += `<li class="list-group-item"><img class='rotten' src='https://www.rottentomatoes.com/assets/pizza-pie/images/icons/global/new-fresh.587bf3a5e47.png'>${movie.Ratings[1].Value}</li>`
                  }
                });

              output += `</ul>
            </div>
          </div>
        </div>

        <div class='jumbotron'>
          <h3>Plot</h3>
          <p>${movie.Plot}</p>
        </div>
      `;

      $('#movie').html(output);
    });

}

function movieDetails(imdbID) {
  sessionStorage.setItem('imdbID', imdbID);
  window.location = 'movie.html';
}


function apiGET(paramsURL) {
  // URL creation
  const API_KEY = '5d88bb13';
  const baseURL = `http://www.omdbapi.com/?apikey=${API_KEY}`;
  const fullURL = `${baseURL}&${paramsURL}`;

  // Request to the API
  let results = axios.get(fullURL)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return results;
}
