//MMDB


// Im using Module pattern
//Module
var magnusMovieDatabase = (() => {
  var movieList = [
    {
      title: 'Bond',
      year:1957,
      genres: ['Action','Drama','Thriller'],
      ratings: [6,4,8,9]
    },
    {
      title: 'Pulp Fiction',
      year: 1995,
      genres: ['Action','Drama','Thriller'],
      ratings: [7,8,8,9]
    },
    {
      title:'Kill Bill vol.1',
      year:2003,
      genres:['Action','Thriller','Crime'],
      ratings:[8,9,9]
    },
    {
      title:'Django Unchained',
      year:2012,
      genres:['Action','Drama','Western'],
      ratings:[7,8,9]

    },
    {
      title:'Inglourious Basterds',
      year:2009,
      genres:['Action','Drama','War'],
      ratings:[8,7,9]
    },
    {
      title:'Sharknado',
      year:2013,
      genres:['Horror','Sci-fi'],
      ratings:[3,2,2]

    }

  ];

  return {
    //Constructor.
    Movie: function(title, year, genres, ratings){
    this.title = title;
    this.year = year;
    this.genres = genres.split(' ');
    this.ratings = ratings.split('');
    },

    //Adding new object movie to MovieList-array.
    addMovieToDataBase: (movie) => {
      movieList.push(movie);
    },

    //Getting input from form and creating new movie-object, pushing it to array.
    getInputFromForm: () => {
      var titleInput = document.getElementById('title').value;
      var yearInput = document.getElementById('year').value;
      var genresInput = document.getElementById('genres').value;
      var ratingsInput = document.getElementById('ratings').value;

      var newMovie = new magnusMovieDatabase.Movie(titleInput, yearInput, genresInput, ratingsInput);
      magnusMovieDatabase.addMovieToDataBase(newMovie);
      magnusMovieDatabase.listAllMoviesToInterface();

      console.log(movieList);
    },
    //List all movies to interface.
    listAllMoviesToInterface: () => {
      var section = document.getElementsByClassName('movie-list')[0];
      var movieHtml = '';
      for(let i = 0 ; i < movieList.length; i++){
        movieHtml += `<article class="movie-card">
          <div class="movie-text">
            <p>Title:${movieList[i].title}</p>
            <p>Release Year:${movieList[i].year}</p>
            <p>Genres:${movieList[i].genres}</p>
            <p>Ratings:${movieList[i].ratings}</p>
          </div>
        </article>`;
      }
      section.innerHTML = movieHtml;
    }
  };
})();


magnusMovieDatabase.listAllMoviesToInterface();

//Adding eventlistener to button for adding movieobject.
var button = document.getElementById('go');

button.addEventListener('click',magnusMovieDatabase.getInputFromForm);



//console.log(magnusMovieDatabase.listAllMovies());


//end obj
