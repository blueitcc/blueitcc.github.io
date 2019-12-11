

function setEmail() {
    var closeButton = document.getElementById('closet');
    localStorage.setItem('email', document.getElementById("formemail").value);
    closeButton.click();
}
// function sendEmail() {

//     var email= document.getElementById("formemail").value;
//     var form = document.getElementById("form-body");

//     $.ajax({
//         type: 'post',
//         url: 'https://dalexmusic.com/app/vote.php',
//         data: {
//             "name": name,
//             "email": email,
//             "number": number,
//             "city": city,
//             "country": country
//         },
//         success: function( data ) {
//                 form.innerHTML = "¡Bienvenido a la pagina de Bellaquita Remix!";
//                 setInterval(function(){ 
//                     close.click();
//                 }, 2000); 
//         },
//         error: function(data) {
//             form.innerHTML = "Su solicitud ha sido negada. Actualice la página y asegúrese de que todos los campos de la aplicación se completen correctamente.";
//             console.log(data);
//             close.click();
//             //close modal
//         }
//     });
// }

// Production Auth url - 'http://accounts.spotify.com/authorize?client_id=59fe4fc33f7744b994cc6e28e1eecb40&redirect_uri=https:%2F%2Frichmusicltd.com%2Fspotify%2fanswer.html&scope=playlist-modify-private%20playlist-modify-public&response_type=token&state=123'

'http://accounts.spotify.com/authorize?client_id=59fe4fc33f7744b994cc6e28e1eecb40&redirect_uri=http:%2F%2Flocalhost:1931%2Fanswer.html&scope=playlist-modify-private%20playlist-modify-public&response_type=token&state=123'