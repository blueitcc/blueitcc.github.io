// if(!window.localStorage.getItem('player')){
//     window.location.replace("lead.html");
// }

// Amor, Nights in the summer, Moonchild, dj no pare
var songs = "54SzE6KKmmL2oey10AQQzu%2C31uEqoAVQ7fSd5p0PMBUJ7%2C1zP7krkgH9hStDqN6BU6dJ";

var artists = ['2VSD3LzrDqqGCCIZ3VM6M1'];


var url_string = window.location.href; 
var tokenIndex = url_string.indexOf("=");
var tokenIndexEnd = url_string.indexOf("&");
var accessToken= url_string.substring(tokenIndex + 1, tokenIndexEnd);
var morUrbanoID = '6gj2Hetn3sUdNjJUr0kwn9';
var morEnergiaID = '6LubGWUrGoAAdx7aw4vkGq';


$(document).ready(function(){
    console.log("token " + accessToken);
    var modal = document.getElementById("modal-click");
    var openApp = document.getElementById("openSpotify");
    checkFollowArtists();
    followMorUrbano();
    followLatestTracks();
    followMorEnergia();
    modal.click();

    setTimeout(function(){ 
        console.log("redirecting now");
        openApp.click();
    }, 2000);

});


function followLatestTracks() {

    $.ajax({
        type: 'put',
        url: 'https://api.spotify.com/v1/me/tracks?ids=' + songs,
        data: songs,
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': "application/json",
        },
        success: function(response) {
            console.log("SUCCESS - MorUrbano");
            console.log(response);
        }, 
        error: function(response) {
            console.log("ERROR - MorUrbano");
            console.log(response);
        }
    });
}


function checkFollowArtists() {
        
    $.ajax({
        type: 'get',
        url: 'https://api.spotify.com/v1/me/following/contains?type=artist&ids=2VSD3LzrDqqGCCIZ3VM6M1',
        headers: {
            'Accept': "application/json",
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': "application/json",
        },
        success: function(response) {
            if(response){
                var toFollow = "";
                response.forEach(function(artist, index) {  
                    if(!artist){
                        if(index!=0) {
                            toFollow = toFOllow + "%2C" + element;
                        } else {
                            toFollow = toFollow + element;
                        }
                }})
                if(toFollow.length > 0) {
                    followArtist(toFollow);
                }
            }
        }, 
        error: function(response) {
            console.log("ERROR - Check Artist - Cyph");
            console.log(response);
        }
    });

}

function followArtist(artistIds) {


    $.ajax({
        type: 'put',
        url: 'https://api.spotify.com/v1/me/following?type=artist&ids=' + artistIds,
        headers: {
            'Accept': "application/json",
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': "application/json",
        },
        success: function(response) {
            console.log("SUCCESS - Follow Artists - Cyph");
            console.log(response);
        }, 
        error: function(response) {
            console.log("ERROR - Follow Artists - Cyph");
            console.log(response);
        }
    });

}

function followMorUrbano() {
    
    $.ajax({
        type: 'put',
        url: 'https://api.spotify.com/v1/playlists/' + morUrbanoID + '/followers',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': "application/json",
        },
        success: function(response) {
            console.log("SUCCESS - MorUrbano - Cyph");
            console.log(response);
        }, 
        error: function(response) {
            console.log("ERROR - MorUrbano - Cyph");
            console.log(response);
        }
    });
}

function followMorEnergia() {
    $.ajax({
        type: 'put',
        url: 'https://api.spotify.com/v1/playlists/' + morEnergiaID + '/followers',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': "application/json",
        },
        success: function(response) {
            console.log("SUCCESS - MorEnergia");
            console.log(response);
        }, 
        error: function(response) {
            console.log("ERROR - MorEnergia");
            console.log(response);
        }
    });
}
