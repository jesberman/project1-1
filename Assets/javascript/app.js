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

// authorizeSpotify();
// getResults();

function authorizeSpotify() {
    var URL = "https://accounts.spotify.com/authorize";
    var clientId = spotifyKey;
    var responseType = "token";
    var redirectURI = "http://localhost:3000//";

    var queryString = URL + "?client_id=" + clientId + "&redirect_uri=" + redirectURI + "&response_type=" + responseType;
    var queryURL = encodeURI(queryString);

    console.log(queryURL);
}

//sample call
setPlaylist("spotify:album:06SgT5Cjd1F7WjpSqZXMOv");

function setPlaylist(uri) {
    var url = "https://open.spotify.com/embed?uri="
    var frameSrc = url + uri
    // properly formated URI looks like this
    // uri=spotify:album:1DFixLWuPkv3KT3TnV35m3
    $("#spotifyPlayer").attr("src", frameSrc);
    console.log(frameSrc);
}
