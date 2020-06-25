const apiKey = '&apikey=bb580bfe';

$(document).ready(() => {
  $('#searchform').on('submit', (e) =>{
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});


function getMovies(searchText){
  superagent.get('http://www.omdbapi.com?s=' +searchText + apiKey)
  .then((res) => {
    let movies = res.body.Search;
    let output = '';
    $.each(movies, (index, movie) => {
      console.log(movie);
      output += `
      <div class = "col-md-3">
        <div class = "well text-center">
          <img src="${movie.Poster}">
          <h5>${movie.Title}</h5>
          <a onClick = "movieSelected('${movie.imdbID}')"
          class = "btn btn primary" href = "#">Movie Details</a>
        </div>
      </div>
      `;
    });

    $('#movies').html(output);

  })
  .catch((err) => {
    console.log(err);
  });
}

function movieSelected(id){

  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie(){
  let movieId = sessionStorage.getItem('movieId');

  superagent.get('http://www.omdbapi.com?i=' +movieId + apiKey)
  .then((res) => {
    let movie = res.body;
    console.log(movie);
    let output = `
    <div class="row">
      <div class="col-md-4">
        <img src="${movie.Poster}" class="thumbnail">
      </div>
      <div class="col-md-8">
        <h2>${movie.Title}</h2>
        <ul class="list-group">
          <li class="list-group-item"><strong>Year: </strong> ${movie.Year}</li>
          <li class="list-group-item"><strong>Genre: </strong> ${movie.Genre}</li>
          <li class="list-group-item"><strong>Director: </strong> ${movie.Director}</li>
          <li class="list-group-item"><strong>Actors: </strong> ${movie.Actors}</li>
          <li class="list-group-item"><strong>IMDB rating: </strong> ${movie.imdbRating}</li>
          <li class="list-group-item"><strong>Votes: </strong> ${movie.imdbVotes}</li>
          <li class="list-group-item"><strong>Box Office: </strong> ${movie.BoxOffice}</li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="well">
        <h3>Plot</h3>
        ${movie.Plot}
        <hr>
        <a href="http://imdb.com/title/${movie.imdbID}/" target="_blank" class="btn btn-primary">View on IMDB</a>
        <a href="index.html" class="btn btn-default">Back to Search</a>
      </div>
    </div>`

    $('#movie').html(output);
  })
  .catch((err) => {
    console.log(err);
  });
}
