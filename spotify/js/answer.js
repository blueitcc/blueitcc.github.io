// if(!window.localStorage.getItem('player')){
//     window.location.replace("lead.html");
// }

// si te vas, la isla, bellaquita remix, dj no pare
var songs = "2krbTmRHxQkp42xB81CvHL";
var artists = ['133sloClSbT0Y474SOcrcp'];

var url_string = window.location.href; 
var tokenIndex = url_string.indexOf("=");
var tokenIndexEnd = url_string.indexOf("&");
var accessToken= url_string.substring(tokenIndex + 1, tokenIndexEnd);



$(document).ready(function(){
    console.log("token " + accessToken);
    var modal = document.getElementById("modal-click");
    var openApp = document.getElementById("openSpotify");
    checkFollowArtists();
    followLatestTracks();
    modal.click();

    setTimeout(function(){ 
        console.log("redirecting now");
        openApp.click();
    }, 5000);

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
        url: 'https://api.spotify.com/v1/me/following/contains?type=artist&ids=133sloClSbT0Y474SOcrcp',
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
                        if(index!=0 && toFollow.length!=0) {
                            toFollow = toFollow + "%2C" + artists[index];
                        } else {
                            toFollow = toFollow + artists[index];
                        }
                }})
                if(toFollow.length > 0) {
                    followArtist(toFollow);
                }
            }
        }, 
        error: function(response) {
            console.log("ERROR - Check Artists");
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
            console.log("SUCCESS - Follow Artists");
            console.log(response);
        }, 
        error: function(response) {
            console.log("ERROR - Follow Artists");
            console.log(response);
        }
    });

}


