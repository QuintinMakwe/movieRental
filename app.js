//have a movie object -> an array of objects
//search through the movies
//rent a movie 

const Movie = function(){
    let movie = [];

    this.addMovie = (movieObj) => {
        movie.push(movieObj)
    }

    this.createMovieCard = (movies) => {
        const movieListDiv = document.querySelector('.movie-list')
        movieListDiv.innerHTML = `
        <div class="header">
            <h3>Movies</h3>
        </div>`
        movies.forEach(movie => {
            //create a div
            const movieCardDiv = document.createElement('div');
            movieCardDiv.classList.add('movie-card')
            movieCardDiv.classList.add('shadow')
            movieCardDiv.innerHTML += `
            <div class="right-float">
                <h4 class="title">${movie.title}</h4>
                <p>${movie.description}.</p>
                <span>${movie.genre}</span>
            </div>
            <div class="left-float">
                <span class="rent">Rent</span>
            </div>`
            movieListDiv.appendChild(movieCardDiv)
        })
    }

    this.getMovies = () => {
        return movie
    }

    this.searchMovie = (query) => {
        //create a regex object for the query and pass in the global and case insensitive flag to our search
        var searchValue = new RegExp(query, 'gi')
        //filtered would house our result 
        let filtered = []
        //loop through the movies
        movie.forEach(movie => {
            //for every key in the movie object, loop through it's value to see if you'll find a match. This way search checks both the title of a movie and description and even the genre
            Object.keys(movie).filter((key)=>{
                //the && operator is to ensure there are duplicates in the array
                if(searchValue.test(movie[key]) && !filtered.includes(movie)){
                    filtered.push(movie)
                }
            })
        })
        //clear the node first
        const movieListDiv = document.querySelector('.movie-list')
        movieListDiv.innerHTML = `
        <div class="header">
            <h3>Movies</h3>
        </div>`
        this.createMovieCard(filtered)      
        return filtered
    }

    this.rent = (e) => {
        const title = e.target.parentNode.parentNode.children[0].children[0].innerHTML
        movie.forEach(movie => {
            if(movie.title == title){
                movie.rented = true
            }
        })
        const toRent = e.target.parentNode.parentNode
        toRent.style.display = 'none'
        console.log(movie)
    }

}


function onLoadFunction(){
    let movieObject = new Movie() 
    movieObject.addMovie({title: "Umbrella university", description: "this is a little description", genre: "action", rented: false})
    movieObject.addMovie({title: "dewayne johnson", description: "this is about dewayne johnson", genre: "romance", rented: false})
    movieObject.addMovie({title: "samuel jackson", description: "this is about samuel jackson", genre: "romance", rented: false})
    movieObject.addMovie({title: "kelvins", description: "this is about samuel jackson", genre: "romance", rented: false})
    movieObject.createMovieCard(movieObject.getMovies());
    console.log(movieObject.getMovies())

    //user induced search 
    document.querySelector('.search').addEventListener('keydown', (e) => {
        if(e.target.value.length > -1){
            movieObject.searchMovie(e.target.value);
        }
    })

    const rentButtons = document.querySelectorAll('.rent')
    rentButtons.forEach(button => {
        button.addEventListener('click', movieObject.rent)
    })

    document.querySelector('.rented-nav').addEventListener('click', (e)=>{
        const parent = e.target.parentNode.parentNode
        console.log(parent.children)
        Array.from(parent.children).forEach(child => {
            if(Array.from(child.classList).includes('active')){
                child.classList.remove('active')
            }
        })
        const element = e.target.parentNode;
        element.classList.add('active')
        const movies = movieObject.getMovies();
        const rentedMovies = movies.filter(movie => {
            return movie.rented == true
        })
        movieObject.createMovieCard(rentedMovies)
    })
    document.querySelector('.home-nav').addEventListener('click', (e)=>{
        const parent = e.target.parentNode.parentNode
        console.log(parent.children)
        Array.from(parent.children).forEach(child => {
            if(Array.from(child.classList).includes('active')){
                child.classList.remove('active')
            }
        })
        const element = e.target.parentNode;
        element.classList.add('active')
        let movies = movieObject.getMovies();
        movies = movies.filter(movie => {
            return movie.rented == false
        })
        movieObject.createMovieCard(movies)
    })

    var tl = gsap.timeline();
    tl.from('.logo', {duration:2, rotation:360})
    tl.from('.movie-card', {duration:2,opacity: 0, y: "random(-200, 200)", ease:"back", stagger: 0.5})
}