const apiKey = '&apikey=bb580bfe';

$(document).ready(() => {
  $('#searchform').on('submit', (e) =>{
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});


function getMovies(searchText){
  console.log(searchText);
  superagent.get('http://www.omdbapi.com?s=' +searchText + apiKey)
  .then((res) => {
    let movies = res.body.Search;
    console.log(movies);

  })
  .catch((err) => {
    console.log(err);
  })
}
