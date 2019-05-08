# Movie App Finder

## Purpose
This application is a movie listing app made with Javascript (ES6) and jQuery. The application uses Axios to make HTTP requests to the OMDB API. 
Then the data is processed, and displayed in a cool web page. 

## How does it work
You go on the index page and type any movie title. You will get a list of results with a detail button associated with each movie.  Then, you click on the 'Details' button and you will be redirected on the movie details page. This page gives more details about the movie like the release, ratings, actors, etc.

## Workflow (index.html)
1. The user enter a movie title and submit the query
2. The movie title is then sent to the OMDB API via Axios
3. JSON object response is retrieved
4. The data is processed to be displayed on the index page
5. The user clicks to see more details about a movie
6. The movie's id is stored in the session storage and the user is redirected to the movie page (movie.html)

## Workflow (movie.html)
1. We read the movie's id from the session storage
2. An API call via Axios is made to retrieve the details about the movie
3. A JSON object response is retrieved
4. The different informations (Release, ratings...) are displayed on the page 
