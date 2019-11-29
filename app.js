
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const mongoose = require('mongoose');
const port = process.env.POpmRT || 8004;
// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


// Configuring the database
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set("useUnifiedTopology", true );
mongoose.connect(config.dbConfig.url);



mongoose.connection.on('error', function () {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

mongoose.connection.once('open', function () {
    console.log("Successfully connected to the database");
});


// app.use('PharmaReports',express.static('PharmaReports'));
// define a simple route
app.get('/', function (req, res) {
    res.json({ "message": "Mean stack" });
});

// Require Notes routes
require('./app/routes/index')(app);

// listen for requests
app.listen(port, function () {
    console.log("Server is listening on port " + port);

});
// https.createServer(app).listen(port);


