/**
 * Created by Chris on 8/18/2017.
 */
// server.js
const express = require('express');
const app = express();
const path = require('path');
// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));
// Start the app by listening on the default


app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});
// Heroku port
app.listen(process.env.PORT || 8080);
