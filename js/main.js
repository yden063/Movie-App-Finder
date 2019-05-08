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
                <img src='${movie.Poster}'>
                <h5>${movie.Title}</h5>
                <a href='#' onclick='movieDetails("${movie.imdbID}")'>
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
  // Construct the endpoint
  const API_KEY = '5d88bb13';
  const baseURL = `http://www.omdbapi.com/?apikey=${API_KEY}&`;
  const fullURL = `${baseURL}s=${searchText}`;
  console.log(fullURL);

  // Request to the API
  let results = axios.get(fullURL)
    .then((response) => {
      return response.data.Search;
    })
    .catch((error) => {
      console.log(error);
    });

  return results;
}

function movieDetails(imdbID) {
  sessionStorage.setItem('imdbID', imdbID);
  window.location = 'movie.html';
}
