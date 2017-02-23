//MMDB


/*Im using Module pattern combined with factory pattern. I wanted to seperate
the Constructor and prototypes from the other application functions to get a more
comprehendable code structure. What the object inherits is the function-prototypes
that processes its own information. The returned functions are functions that operate
on the entire list of objects.
*/
//Module
var magnusMovieDatabase = (function() {
  //Private Array of Movie-objects.

  var movieList = [];
  var finalGenres = [];
  var oldList = [
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
      genres:['Drama','Western'],
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

  //Private Factory object./////////////////////////////////////////////
  var Movie = {

    //Constructor prototype.
    create: function(title, year, genres, ratings){
      var newMovie = Object.create(this);
      newMovie.title = title;
      newMovie.year = year;
      if(Array.isArray(genres)){
        newMovie.genres = genres;
        newMovie.ratings = ratings;
      }
      else{
        newMovie.genres  = genres.split(' ');
        newMovie.ratings = ratings.split(' ');
      }

      return newMovie;
    },

    //Prototypes
    calcThisAverage: function(){
      let arr = this.ratings.reduce(function(prev,obj){
        return prev + obj;
      },0);
      return arr/this.ratings.length;
    },
    rateMovie:function(rating){
      this.ratings.push(rating);
      console.log(this.ratings);
    },
    sayLog:function(){
      console.log(`hej jag är ${this.title}`);
    }
  };
//Returned functions for app./////////////////////////////////////////////////////////////////////////////
  return {
    //returns Movie object with all its properties so that it can be accesed through namespace.
    Movie:Movie,

    //Getting input from form and creating new movie-object, pushing it to array.
    getInputFromForm: function() {
      var titleInput = document.getElementById('title').value;
      var yearInput = document.getElementById('year').value;
      var genresInput = document.getElementById('genres').value;
      var ratingsInput = document.getElementById('ratings').value;

      var createdMovie = magnusMovieDatabase.Movie.create(titleInput, yearInput, genresInput, ratingsInput);
      magnusMovieDatabase.addMovieToDataBase(createdMovie);

      magnusMovieDatabase.listAllMoviesToInterface();
    },

    addMovieToDataBase: function(movie) {
      movieList.push(movie);
    },

    //List movies to interface with passed array.
    listAllMoviesToInterface: (list) => {
      if(list===undefined){list=movieList;}

      var section = document.getElementsByClassName('movie-list')[0];
      var movieHtml = '';
      for(let i = 0 ; i < list.length; i++){
        movieHtml += `<article class="movie-card">
          <div class="movie-text">
            <h3>Title:${list[i].title}</h3>
            <p>Release Year:${list[i].year}</p>
            <p>Genres:${list[i].genres}</p>
            <p>Ratings:${list[i].calcThisAverage()}</p>
          </div>
          <div class="movie-buttons">
            <label for="rating">Rate Movie</lable>
            <input class="rating-input" name="rating" type="text" id="rate-id" placeholder="1-10"></input>
            <button class="card-button" id="rate">Rate</button>
            <button class="card-button" id="delete">Delete</button>
          </div>
        </article>`;
      }
      section.innerHTML = movieHtml;
    },
    //Calculates average rating for movie object.
    calcAverageRating:function(i,list){
        var sum = 0;
        var arr = list[i].ratings || this.ratings;
        for(let j = 0; j<arr.length; j++){
          sum += arr[j];
        }
        return sum/arr.length;
    },


  addProtoToExistingMovies: function(){


      for(var i = 0; i<oldList.length; i++){
        var title = oldList[i].title;
        var year = oldList[i].year;
        var genres = oldList[i].genres;
        var ratings = oldList[i].ratings;
        var newObj = magnusMovieDatabase.Movie.create(title,year,genres,ratings);
        movieList.push(newObj);
      }
      console.log(movieList);
    },

    //Get top rated movie.
    getTopRatedMovie: function(){
      var topList = movieList.reduce(function(prev, obj){
        return prev.ratings > obj.ratings ? prev:obj;
      });
      return topList;
    },
    //Get all movies from a specifik genre.
    getMoviesFromGenre: function(genre){
      var localMovieList = [...movieList];
      var localGenres = [];
      for(var i=0; i<localMovieList.length;i++){
        var genreList = localMovieList[i].genres;
        for(var j = 0; j<genreList.length;j++){
          if(genreList[j]===genre){
            localGenres.push(localMovieList[i]);
          }
        }
      }
      finalGenres = localGenres;
      console.log(finalGenres);
      magnusMovieDatabase.listAllMoviesToInterface(finalGenres);
      /*
var genreList = movieList.map(function(obj){
        return obj.genres.filter(function(obj){
          return obj === 'Action';
        });
      }).map(function(obj){
        return obj.title;
      });
      return genreList;
    }*/

    },
    accesMovieList:function(){
      return movieList;
    }

  };
})();
//Runs at init of application.
magnusMovieDatabase.addProtoToExistingMovies();
magnusMovieDatabase.listAllMoviesToInterface();

//Adding eventlistener to button for adding movieobject.
var button = document.getElementById('go');
var all = document.getElementById('all-movies');
var horrorButton = document.getElementById('horror');
var actionButton = document.getElementById('action');

button.addEventListener('click',magnusMovieDatabase.getInputFromForm);
all.addEventListener('click', function(){magnusMovieDatabase.listAllMoviesToInterface();});
horrorButton.addEventListener('click',function(){magnusMovieDatabase.getMoviesFromGenre('Horror');});
actionButton.addEventListener('click',function(){magnusMovieDatabase.getMoviesFromGenre('Action');});
//magnusMovieDatabase.addProtoToExistingMovies();
//var halo = magnusMovieDatabase.Movie.create('Halo',2668,'kalle',5);

//console.log(halo);

//halo.rateMovie(7);

//console.log(halo.calcThisAverage());

//console.log(magnusMovieDatabase.getTopRatedMovie());
//console.log(magnusMovieDatabase.listAllMovies());
//console.log(magnusMovieDatabase.Movie.avarageRating());
//console.log(magnusMovieDatabase.getMoviesFromGenre('Action'));
console.log(magnusMovieDatabase.getTopRatedMovie());


//console.log(array);
