var express = require("express"),
  cors = require('cors'),
  app = express(),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override");
mongoose = require('mongoose');

/* ---------- CONFIGS ---------- */

//Db Name
var dbName = 'apiRestQuinielaDB';

//PORT LISTEN
var port = 80;

//var dbLocation = 'ec2-52-35-13-146.us-west-2.compute.amazonaws.com';
var dbLocation = 'localhost';


/* ---------- CONFIGS ---------- */

// Connection to DB
mongoose.connect('mongodb://'+dbLocation+'/' + dbName, function(err, res) {
  if (err) throw err;
  console.log('Connected to Database ' + dbName);
});

// Middlewares
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());


// API routes
var routesIndex = require('./routes/index');
var routesUser = require('./routes/user');
var routesTeam = require('./routes/team');
var routesSeason = require('./routes/season');
var routesGame = require('./routes/game');
var routesVote = require('./routes/vote');
var routesWorkingDay = require('./routes/workingDay');
var routesLog = require('./routes/log');

var routesTest = require('./routes/test');

app.use('/api', routesIndex);
app.use('/api', routesUser);
app.use('/api', routesTeam);
app.use('/api', routesSeason);
app.use('/api', routesGame);
app.use('/api', routesVote);
app.use('/api', routesWorkingDay);
app.use('/api', routesLog);

app.use('/api', routesTest);





// Start server
app.listen(port, function() {
  console.log("Node server running on http://localhost:" + port);
});
