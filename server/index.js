var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

//EXRPESS IS THE FRAMEWORK FOR CREATING SERVERS
var app = express();
app.set('env', 'development');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//THIS IS REGULAR CONFIGURATION STUFF
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//THIS SETS UP A STATIC RESOURCE FOLDER TO ACCESS PUBLIC FILES VIA HTTP
// app.use(express.static(path.join(__dirname, '../client/src')));
app.use(express.static(path.join('/home/csuser/Applications/cpk-media-server/client/src')));

//Load Middleware Functions
////static pages
var home = require('./routes/view_engine/index');
////api requests
// var hello = require('./routes/hello');

//Route Paths to Middleware
////static-pages
app.use('/', home);
////api requests
// app.use('/api/hello/', hello);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});

var debug = require('debug')('WebAPI');

//START SERVER
app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
console.log('Application available at port: ' + app.get('port'));

module.exports = app;