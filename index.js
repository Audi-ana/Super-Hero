let movies = document.getElementById("movies")
let displayInfo = document.getElementById("movieDetails")
let movieURL = "http://www.omdbapi.com/?s=spider-man&apikey=eb22d874&series"

let request = new XMLHttpRequest()
request.open("GET",movieURL)
request.send()
request.onload = function(){

    if(request.status != 200) {
        console.log("Server not found.")
      } else {
        // console.log("Response Recieved")
        // console.log(request.responseText)
        // console.log(JSON.parse(request.responseText))
        let moviesResponse = JSON.parse(request.responseText)
      displayMovieDetails(moviesResponse)
    }

 
}

function displayMovieDetails(movie){
    movies.innerHTML = movie.Title

    let movieList = movie.Search.map(function(m){
        return `<li class="movieListStyling">
                   <img src="${m.Poster}" class="imageStyling"></img>
                   <h1>${m.Title}</h1>
                   <div>${m.Year} <button onclick="moreInfo('${m.imdbID}')" id="moreInfo" class="styling"><img class="sizing" src="more-info-button.jpeg"/></button></div>
                </li>`

    })
    // console.log(movies)
    movies.innerHTML = movieList.join('')
}

// sending the request
function moreInfo(id){
    let moreInfoURL = "http://www.omdbapi.com/?i="+id+ "&apikey=eb22d874"
    let getInfo = new XMLHttpRequest()
    getInfo.open("GET",moreInfoURL)
    getInfo.send()
    getInfo.onload = function(){
        if(getInfo.status != 200){
            console.log("Server not found.")
         } else {
            console.log("Response Recieved")
         //displaying the information on the browser
           let movieDetails = JSON.parse(getInfo.responseText)
            let movieInfo = `<li>
                <h2>${movieDetails.Title}</h2>
                <div>${movieDetails.Plot}</div><br>
                <div>Genre: ${movieDetails.Genre}</div>
                <div>Writer: ${movieDetails.Writer}</div>
                <div>Directed by: ${movieDetails.Director}</div>
                <div>${movieDetails.Runtime}</div>
                <div>${movieDetails.Rated}</div>
            </li>`

            displayInfo.innerHTML = movieInfo
         }
     
         
        }
        
}




