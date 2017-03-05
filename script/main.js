//MMDB-- Link to GitHub-repo: https://github.com/magnusohrstrom/MMDB


/*Im using Module pattern combined with factory pattern for constructor.
I wanted to seperate the constructor with its prototypes from the other application functions
to get a more comprehendable code structure.
Therefore I put the factory-constructor "Movie" in the module
before the returned objekt. It is then passed ass the property "Movie" to the returned objekt.
Movies prototype-functions operates on the objects own values and the returned functions operate
on the entire list of objects.

The Module pattern provides a strict namespace that hides all variables and funktions from
the globalscope. The risk of duplicating or overwriting varibales or functions is thus
minimalized. The modules content can only be accessed from namepacing the module with dotation.
The cons of this pattern is that it saves duplicates of object-functions in memory and is said to add
debugging complexity.


The Factory pattern doesnt need you to use the "new" keyword in creating objects
and in some degree doesent use the "this" keyword in the same way.
Instead a construktor method is created with the Object.create() function.
All the objekts prototype-functions is then declared in the factory as properties instead of asigning them
with dot-notation after the constructor is created as is the case with the constructor pattern.
These prototypes are then used in the "application-functions" to process the objects own values.
Thats where I make use of the prototype-chain.

I think that the factory pattern is some what easier to read because everything that is
asocieated with the object-constructor is declared inside the factory. It's "already" a
finished version of the objekts that it creates.
*/

//Module
const magnusMovieDatabase = (() => {

  //List of Movie-objects.
  let movieList = [];
  //List for temporary search results to load to interface.
  let tempList = [];
  //Hardcode objects to transform to Movie-objects.
  const oldList = [
    {
      title: "Gladiator",
      year: 2000,
      genres: ["Action", "Adventure", "Drama"],
      ratings: [10,10,10,10]
    },
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
    },
    {
      title: 'Casino Royale',
      year: 2006,
      genres: ['Action','Adventure','Thriller'],
      ratings: [6,4,8,9,9,9,9]
    },

    {
      title:'Star Wars: Episode VI - Return of the Jedi',
      year: 1983,
      genres:["Action", "Adventure", "Fantasy"],
      ratings:[9,10,10,10,9]

    },
    {
      title: "Fury",
      year: 2014,
      genres: ["Action", "Drama", "War"],
      ratings: [8,9,9,6,7,8,9,8]
    }
  ];

  //Private Factory object with constructor and prototype-functions./////////////////////////////////////////////
  const Movie = {
    //Constructor prototype.
    create: function(title, year, genres, ratings){
      var newMovie = Object.create(this);
      newMovie.title = title;
      newMovie.year = year;

      //Checks if genres value is Array. This enables construktor to work with
      //both existing objekts and creating new objekts from form.
      if(Array.isArray(genres)){
        newMovie.genres = genres;
        newMovie.ratings = ratings;
      }
      else{
        newMovie.genres  = createGenresArray(genres);
        newMovie.ratings = createRatingsArray(ratings);
      }
      return newMovie;
    },

    //Prototypes
    //Calculates the average rating of this objekt.
    calcThisAverage: function(){
      let arr = this.ratings.reduce(function(prev,obj){
        return Number(prev) + Number(obj);
      },0);
      return (arr/this.ratings.length);
    },
    //Pushes rating to this objekts array "ratings".
    addRating:function(rating){
      this.ratings.push(rating);
    },
    //Adds genre to movie.
    addGenre:function(genre){
      this.genres.push(genre);
    },
    //removes Genre from movie.
    removeGenre:function(genre){
      this.genres = this.genres.filter(function(elem){
        return elem.toUpperCase() !== genre.toUpperCase();
      });
    }
  };
  createGenresArray = (genres) => {
    return genres.split('').indexOf(',') === -1 ? genres.split(' '):genres.split(',');
  };
  createRatingsArray = (ratings) => {
    return ratings.split('').filter(function(elem){
      return elem !== ','&& elem !== ' ' && elem !== '.';
    });
  };

//Returned functions for app./////////////////////////////////////////////////////////////////////////////
  return {
    //returns Movie object with all its properties so that it can be accesed through namespace.
    Movie:Movie,

    //Getting input from form and creating new movie-object, pushing it to array.
    getInputFromForm: () => {
      let titleInput = document.getElementById('title').value;
      let yearInput = document.getElementById('year').value;
      let genresInput = document.getElementById('genres').value;
      let ratingsInput = document.getElementById('ratings').value;
      let createdMovie = magnusMovieDatabase.Movie.create(titleInput, yearInput, genresInput, ratingsInput);
      magnusMovieDatabase.addMovieToDataBase(createdMovie);
      magnusMovieDatabase.toggleActive('add-form');
      magnusMovieDatabase.listAllMoviesToInterface();
    },

    addMovieToDataBase: (movie) => {
      movieList.push(movie);
    },

    //List movies to interface with passed array-argument. Here I use the Movieprototype
    //.calcThisAverage to add the average rating of each object.
    listAllMoviesToInterface: (list) => {
      if(list===undefined){
        list=movieList;
      }
      let section = document.getElementsByClassName('movie-list')[0];
      let movieHtml = '';
      for(let i = 0 ; i < list.length; i++){
        movieHtml +=
        `<article class="movie-card">
            <h3>${list[i].title}</h3>
            <p>Released: ${list[i].year}</p>
            <p>${list[i].genres}</p>
            <p>Rating: ${list[i].calcThisAverage().toFixed(2)}</p>
        </article>`;
      }
      section.innerHTML = movieHtml;
    },
    //Adds prototypes to allready excisting array objects and creating Movie objects.
    addProtoToExistingMovies: () => {
      for(var i = 0; i<oldList.length; i++){
        var title = oldList[i].title;
        var year = oldList[i].year;
        var genres = oldList[i].genres;
        var ratings = oldList[i].ratings;
        var newObj = magnusMovieDatabase.Movie.create(title,year,genres,ratings);
        movieList.push(newObj);
      }
    },

    //Gets top rated movie and adds it to interface. Prototype used.
    getTopRatedMovie: () => {
      tempList = movieList.reduce((prev, obj)=>{
        return prev.calcThisAverage() > obj.calcThisAverage() ? prev:obj;
      });
      tempList=[tempList]; //= [topList];
      magnusMovieDatabase.listAllMoviesToInterface(tempList);
    },
    //Returns worst rated movie and adds it to interface. Prototype used.
    getWorstRatedMovie: () => {
      tempList = movieList.reduce((prev,obj)=>{
        return prev.calcThisAverage() < obj.calcThisAverage() ? prev:obj;
      });
      tempList = [tempList];
      magnusMovieDatabase.listAllMoviesToInterface(tempList);
    },
    //Get all movies from a specifik genre and then list them to html-interface.
    getMoviesFromGenre: (genre) => {
      let localGenres = [];
      for(let i=0; i<movieList.length;i++){
        var genreList = movieList[i].genres;
        for(let j = 0; j<genreList.length;j++){
          if(genreList[j].toUpperCase()===genre.toUpperCase()){
            localGenres.push(movieList[i]);
          }
        }
      }
      tempList = localGenres;
      magnusMovieDatabase.listAllMoviesToInterface(tempList);
    },
    //Find Movie from argument input. Depending on if the input value is a number or string
    //different functions will run.
    findMovie:(value) => {
      return (isNaN(Number(value)))
      ? magnusMovieDatabase.findTitle(value):magnusMovieDatabase.findNumber(value);

    },
    //finds movie by titlestring.
    findTitle:(value) => {
        return tempList = movieList.filter(function(elem){
          return elem.title.toUpperCase().indexOf(value.toUpperCase()) !== -1;
        });
    },
    //Finds movie by number.
    findNumber:(value) => {
      return value.length < 4 ? magnusMovieDatabase.findRating(value):magnusMovieDatabase.findYear(value);
    },
    //Finds movie by rating. Prototype used.
    findRating:(value) => {
      return tempList = movieList.filter(function(elem){
        return Math.floor(elem.calcThisAverage()) === Number(value);
      });
    },
    //Finds movie by year.
    findYear:(value) => {
       return tempList = movieList.filter(function(elem){
          return elem.year === Number(value);
        });
    },
    //Get movie from form values and post list of movies returned to html.
    getMovieFromSearch:() => {
      let title = document.getElementById('search-title').value;
      let result = magnusMovieDatabase.findMovie(title);

      return result[0]===undefined ? magnusMovieDatabase.getMoviesFromGenre(title):
        magnusMovieDatabase.listAllMoviesToInterface(result);
    },

    //Find movie and add genre to Movies array genres.
    addGenreFromForm: ()=> {
      let title = document.getElementById('title-genre').value;
      let result = magnusMovieDatabase.findMovie(title);
      let genreToAdd = document.getElementById('add-genre').value;
      result[0].addGenre(genreToAdd);
      magnusMovieDatabase.listAllMoviesToInterface(result);
    },
    //Removes genre from Movie.
    removeGenreFromForm: ()=> {
      let title = document.getElementById('title-genre').value;
      let result = magnusMovieDatabase.findMovie(title);
      let genreToRemove = document.getElementById('add-genre').value;
      result[0].removeGenre(genreToRemove);
      magnusMovieDatabase.listAllMoviesToInterface(result);
    },
    //Gets input from rate-form and sets that rating to specified titles ratings array.
    //Prototype Movie.addRating used.
    setRatingFromForm:function(){
      let title = document.getElementById('rate-title').value;
      let rating = Number(document.getElementById('rate').value);
      let movieToRate = magnusMovieDatabase.findMovie(title);
      movieToRate[0].addRating(rating);
      magnusMovieDatabase.toggleActive('rate-form');
      magnusMovieDatabase.listAllMoviesToInterface(movieToRate);
    },
    //Enables click on search-button when enter-key is pressed.
    enterKey:(key) => {
      key=window.event;
      if(window.event.keyCode == 13){
        document.getElementById('search-button').click();
        return false;
      }

    },
    //Toggles class "active" to speciefied element. Opening of forms etc.
    toggleActive:(list) => {
      let elem = document.getElementsByClassName(list);
      elem[0].classList.toggle('active');
    },
    //Runs at initiation of application to add eventlisteners and create objects-array.
    init:() => {
      magnusMovieDatabase.addProtoToExistingMovies();
      let searchButton = document.getElementById('search-title');
      let button = document.getElementById('go');
      let all = document.getElementById('all-movies');
      let horrorButton = document.getElementById('horror');
      let actionButton = document.getElementById('action');
      let topratedButton = document.getElementById('top');
      let worstRatedButton = document.getElementById('worst');
      let rate = document.getElementById('rate-button');
      let input = document.getElementById('search-title');
      let add = document.getElementById('add-movie');
      let addRate = document.getElementById('rate-movie');
      let crime = document.getElementById('Crime');
      let genreButton = document.getElementById('genre-h2');
      let genreAdd = document.getElementById('genre-button');
      let genreToRemove = document.getElementById('genre-button-remove');
      genreToRemove.addEventListener('click',magnusMovieDatabase.removeGenreFromForm);
      genreAdd.addEventListener('click',magnusMovieDatabase.addGenreFromForm);
      genreButton.addEventListener('click',function(){magnusMovieDatabase.toggleActive('genre-form');});
      input.setAttribute('onkeypress','return magnusMovieDatabase.enterKey(event);');
      searchButton.addEventListener('input', magnusMovieDatabase.getMovieFromSearch);
      addRate.addEventListener('click',function(){magnusMovieDatabase.toggleActive('rate-form');});
      add.addEventListener('click', function(){magnusMovieDatabase.toggleActive('add-form');});
      button.addEventListener('click',magnusMovieDatabase.getInputFromForm);
      all.addEventListener('click', function(){magnusMovieDatabase.listAllMoviesToInterface();});
      horrorButton.addEventListener('click',function(){magnusMovieDatabase.getMoviesFromGenre('Horror');});
      actionButton.addEventListener('click',function(){magnusMovieDatabase.getMoviesFromGenre('Action');});
      crime.addEventListener('click', function(){magnusMovieDatabase.getMoviesFromGenre('Crime');});
      topratedButton.addEventListener('click',function(){magnusMovieDatabase.getTopRatedMovie();});
      worstRatedButton.addEventListener('click',function(){magnusMovieDatabase.getWorstRatedMovie();});
      rate.addEventListener('click',magnusMovieDatabase.setRatingFromForm);
    }
  };
})();
magnusMovieDatabase.init();
