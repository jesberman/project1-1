// Spotify Call

var authAttempts = 0;
var authorized;

getResults("overcast");


function storeToken(at) {
    localStorage.clear();
    localStorage.setItem("token", JSON.stringify(at));
}

function getToken() {
    if (localStorage.getItem("token") != null) {
        token = JSON.parse(localStorage.getItem("token"));
        return token;
    } else {
        return false;
    }
}


function getResults(st) {
    var URL = "https://api.spotify.com/v1/search";
    var searchTerm = st;
    var searchType = "playlist";
    var market = "us";
    var queryString = URL + "?q=" + searchTerm + "&type=" + searchType + "&market=" + market;
    var queryURL = encodeURI(queryString);


    if (checkAuth() === 0) {
        // if auth call fails get the token
    } else {
        accessToken = token;
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
        }).then(function (response) {
            console.log(response);
        });
    }
}



function authorizeSpotify() {
    var URL = "https://accounts.spotify.com/authorize";
    var clientId = spotifyKey;
    var responseType = "token";
    var redirectURI = "http://localhost:3000/";
    var queryString = URL + "?client_id=" + clientId + "&redirect_uri=" + redirectURI + "&response_type=" + responseType;
    var queryURL = encodeURI(queryString);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        //console.log(queryURL);
        var accessToken = window.location.href.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];
        storeToken(accessToken);
    })
}






function checkAuth() {
    if (authAttempts < 4) {
        if (getToken() === false) {
            authorized = 0;
            authAttempts++;
            authorizeSpotify();
            checkAuth();
        } else {
            accessToken = token;
            $.ajax({
                url: 'https://api.spotify.com/v1/me',
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                success: function (response) {
                    alert("success")
                    authorized = 1;
                    authAttempts = 0
                    return 1;
                },
                error: function (response) {
                    authorized = 0
                    authAttempts++
                    authorizeSpotify();
                    checkAuth();
                }
            })
        }
    } else {
        alert("can't login")
    }
}
















//sample call
setPlaylist("spotify:user:spotify:playlist:37i9dQZF1DX1gRalH1mWrP");

function setPlaylist(uri) {
    var url = "https://open.spotify.com/embed?uri="
    var frameSrc = url + uri
    // properly formated URI looks like this
    // uri=spotify:album:1DFixLWuPkv3KT3TnV35m3
    $("#spotifyPlayer").attr("src", frameSrc);
    console.log(frameSrc);
}


getLocation();


// Accuweather code

function getLocation() {
    var URL = "http://dataservice.accuweather.com/locations/v1/cities/search";
    var searchTerm = "matawan";
    var key = accuweatherKey;
    var queryString = URL + "?apikey=" + key + "&q=" + searchTerm;
    var queryURL = encodeURI(queryString);
    console.log(queryURL);


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var URL = "http://dataservice.accuweather.com/currentconditions/v1/"
        var location = response[0].Key;
        var queryString = URL + location + "?apikey=" + key + "&details=true";
        var qURL = encodeURI(queryString);
        console.log(qURL)

        $.ajax({
            url: qURL,
            method: "GET"
        }).then(function (currWeather) {
            console.log(currWeather)
            var searchTerm = currWeather[0].WeatherText;
            //authorizeSpotify(searchTerm)
            getResults(searchTerm);
        })
    })
}
