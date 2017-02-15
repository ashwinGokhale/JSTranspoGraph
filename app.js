var express = require('express');
var app = express();
var bodyParser = require('body-parser');
require('./static/settings')();

function App() {
    App.g = new Graph();
    App.locations = [];
}


//loadLocations();



//createPaths();

var routes = require('./routes');

// Set port to 5000 by default
app.set('port', (process.env.PORT || 5000));

app.use("/static", express.static(__dirname + '/static'));

app.get('/', function (req, res) {
    res.sendFile('C:/Users/Ashwin/Dropbox/JSTransportation/views/index.html');
});


// Run Server
app.listen(app.get('port'), function (err) {
    console.log("Listening on port %s", app.get('port'));
    loadVehicles(loadLocations(createPaths));
    console.log(App.g);             // Prints undefined
    console.log(App.locations);     // Prints undefined
});

module.exports = App;