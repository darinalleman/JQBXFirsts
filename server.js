const express = require('express');
const app = express();
// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));
// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 8080);

app.get('/callback', function (req, res) {
    console.log(res);
    // var hash = window.location.hash;
    // if (hash) {
    //   if (window.location.search.substring(1).indexOf('error') !== -1) {
    //     // login failure
    //     window.close();
    //   } else if (hash) {
    //     // login success
    //     var token = window.location.hash.split('&')[0].split('=')[1];
    //     localStorage.setItem('angular2-spotify-token', token);
    //   }
    // } else {
    //   window.close();
    // }
});