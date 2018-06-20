// Spotify Call
var URL = "https://api.spotify.com/v1/search";
var searchTerm = "summer";
var searchType = "playlist";
var market = "us";
var queryString = URL + "?q=" + searchTerm + "&type=" + searchType + "&market=" + market;
var queryURL = encodeURI(queryString);
console.log(queryURL);

function getResults() {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    })
}