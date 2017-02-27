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
  var tempList = [];
  var oldList = [
    {
        title: "Assassins Creed",
        year: 2016,
        genres: ["Action", "Adventure", "Fantasy"],
        ratings: [0,2,5,8,9,1,3,4,6,3]
    },

    {
        title: "Jason Bourne",
        year: 2016,
        genres: ["Action", "Thriller"],
        ratings: [6,6,7,8,9,2,4,3,2,6]
    },

    {
        title: "Waterworld",
        year: 1995,
        genres: ["Action", "Adventure", "Sci-Fi"],
        ratings: [8,9,6,5,7,8,6,7,5,9]
    },

    {
        title: "Blade Runner",
        year: 1982,
        genres: ["Sci-Fi", "Thriller"],
        ratings: [9,8,9,7,9,8,9,8,9]
    },

    {
        title: "The Big Lebowski",
        year: 1998,
        genres: ["Comedy", "Crime", "Mystery"],
        ratings: [9,9,9,9,8,8,7,6,8,5]
    },
    {
        title: "Fight Club",
        year: 1999,
        genres: ["Drama"],
        ratings: [9,9,7,8,6,7,8,8,7,6]
    },
    {
        title:"Finding Nemo",
        year:2003,
        genres:["Horror"],
        ratings:[1,5,7,4,2,7,8,9,3]
    },
    {
        title:"Stargate",
        year:1994 ,
        genres:["Action","Adventure","Sci-Fi"],
        ratings:[10,10,10,9,8,10,8]
    },
    {
        title:"Arrival",
        year:2016 ,
        genres:["Action","Sci-Fi"],
        ratings:[5,7,3,7,9]
    },
    {
        title:"The Brothers Lionheart",
        year:1977 ,
        genres:["Action","Adventure"],
        ratings:[5,7,8,2,4,7,9]
    },
    {
      title: 'The Exorcist',
      year: 1973,
      genres: ['Horror','Thriller'],
      ratings:[7,8,8,9]
    },
    {
      title: 'Kill Bill vol.2',
      year: 2005,
      genres: ['Action','Thriller','Crime'],
      ratings:[7,8,7,8]
    },
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
  const Movie = {

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
        newMovie.ratings = ratings.split('');
        console.log(newMovie.ratings);
      }
      return newMovie;
    },

    //Prototypes
    calcThisAverage: function(){
      var arr = this.ratings.reduce(function(prev,obj){
        return Number(prev) + Number(obj);
      },0);
      return (arr/this.ratings.length).toFixed(2);

    },
    addRating:function(rating){
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
        movieHtml +=
        `<article class="movie-card">
            <h3>${list[i].title}</h3>
            <p>Released: ${list[i].year}</p>
            <p>${list[i].genres}</p>
            <p>Rating: ${list[i].calcThisAverage()}</p>
        </article>`;
      }
      section.innerHTML = movieHtml;
    },
    //Adds prototypes to allready excisting array objects and creating Movie objects.
    addProtoToExistingMovies: function(){
      for(var i = 0; i<oldList.length; i++){
        var title = oldList[i].title;
        var year = oldList[i].year;
        var genres = oldList[i].genres;
        var ratings = oldList[i].ratings;
        var newObj = magnusMovieDatabase.Movie.create(title,year,genres,ratings);
        movieList.push(newObj);
      }
    },

    //Gets top rated movie and adds it to interface.
    getTopRatedMovie: function(){
      tempList = movieList.reduce(function(prev, obj){
        return prev.calcThisAverage() > obj.calcThisAverage() ? prev:obj;
      });
      tempList=[tempList]; //= [topList];

      magnusMovieDatabase.listAllMoviesToInterface(tempList);
    },
    //Returns worst rated movie and adds it to interface.
    getWorstRatedMovie: function(){
      tempList = movieList.reduce(function(prev,obj){
        return prev.calcThisAverage() < obj.calcThisAverage() ? prev:obj;
      });
      tempList = [tempList];
      magnusMovieDatabase.listAllMoviesToInterface(tempList);
    },
    //Get all movies from a specifik genre.
    getMoviesFromGenre: function(genre){
      var localGenres = [];
      for(var i=0; i<movieList.length;i++){
        var genreList = movieList[i].genres;
        for(var j = 0; j<genreList.length;j++){
          if(genreList[j].toUpperCase()===genre.toUpperCase()){
            localGenres.push(movieList[i]);
          }
        }
      }
      tempList = localGenres;
      magnusMovieDatabase.listAllMoviesToInterface(tempList);
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
    //Find Movie from argument input.
    findMovie:function(value){

      if(isNaN(Number(value))){
        return magnusMovieDatabase.findTitle(value);
      }
      else{
        return magnusMovieDatabase.findYear(value);
      }
    },

    findTitle:function(value){
      return tempList = movieList.filter(function(elem){
        return elem.title.toUpperCase() === value.toUpperCase();});
    },

    findYear:function(value){
       return tempList = movieList.filter(function(elem){
          return elem.year === Number(value);
        });
    },
    //Get movie from form values and post list of movies returned to html.
    getMovieFromSearch:()=>{
      var argument = document.getElementById('search-title').value;
      var second = magnusMovieDatabase.findMovie(argument);

      if(second[0]===undefined){
        magnusMovieDatabase.getMoviesFromGenre(argument);
      }
      else{
        magnusMovieDatabase.listAllMoviesToInterface(second);
      }


    },
    //Gets input from rate-form and sets that rating to specified titles ratings array.
    setRatingFromForm:function(){
      var title = document.getElementById('rate-title').value;
      var rating = Number(document.getElementById('rate').value);
      var movieToRate = magnusMovieDatabase.findMovie(title);
      movieToRate[0].addRating(rating);
      magnusMovieDatabase.listAllMoviesToInterface(movieToRate);
    },

    accesMovieList:function(){
      return movieList;
    },

    enterKey:function(key){
      key=window.event;
      if(window.event.keyCode == 13){
        document.getElementById('search-button').click();
        return false;
      }

    },
    toggleActive: function(id){
      let elem = document.getElementById(id);
      elem.classList.toggle('active');
    }
  };
})();

(function(){
//Runs at init of application.
magnusMovieDatabase.addProtoToExistingMovies();
//magnusMovieDatabase.listAllMoviesToInterface();

//Adding eventlistener to button for adding movieobject.
var searchButton = document.getElementById('search-button');
var button = document.getElementById('go');
var all = document.getElementById('all-movies');
var horrorButton = document.getElementById('horror');
var actionButton = document.getElementById('action');
var topratedButton = document.getElementById('top');
var worstRatedButton = document.getElementById('worst');
var rate = document.getElementById('rate-button');
var input = document.getElementById('search-title');
input.setAttribute('onkeypress','return magnusMovieDatabase.enterKey(event);');
searchButton.addEventListener('click', magnusMovieDatabase.getMovieFromSearch);

button.addEventListener('click',magnusMovieDatabase.getInputFromForm);
all.addEventListener('click', function(){magnusMovieDatabase.listAllMoviesToInterface();});
horrorButton.addEventListener('click',function(){magnusMovieDatabase.getMoviesFromGenre('Horror');});
actionButton.addEventListener('click',function(){magnusMovieDatabase.getMoviesFromGenre('Action');});
topratedButton.addEventListener('click',function(){magnusMovieDatabase.getTopRatedMovie();});
worstRatedButton.addEventListener('click',function(){magnusMovieDatabase.getWorstRatedMovie();});
rate.addEventListener('click',magnusMovieDatabase.setRatingFromForm);
})();
