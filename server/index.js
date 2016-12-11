process.title = "cpk-media-server";
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');

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
app.use(logger('dev'));

//THIS SETS UP A STATIC RESOURCE FOLDER TO ACCESS PUBLIC FILES VIA HTTP
app.use(express.static(path.join('../client/src')));

//Load Middleware Functions
////static pages
var home = require('./routes/view_engine/index');
////api requests
var video_list = require('./routes/video/video_list');
var files_list = require('./routes/files/files_list');
var cpk_upload = require('./routes/files/upload');
var new_folder = require('./routes/files/new_folder');
var rename = require('./routes/files/rename');
var delete_files = require('./routes/files/delete_files');
var download_files = require('./routes/files/download_files');
var pictures_list = require('./routes/pictures/pictures_list');
var music_list = require('./routes/music/music_list');
var playlists = require('./routes/music/playlists');
var youtube = require('./routes/music/youtube');
var song_map = require('./routes/music/song_map');

//Route Paths to Middleware
////static-pages
app.use('/', home);
////api requests
app.use('/video/video_list', video_list);
app.use('/files/files_list', files_list);
app.use('/files/upload', cpk_upload);
app.use('/files/new_folder', new_folder);
app.use('/files/rename', rename);
app.use('/files/delete_files', delete_files);
app.use('/files/download_files', download_files);
app.use('/pictures/pictures_list', pictures_list);
app.use('/music/music_list', music_list);
app.use('/music/playlists', playlists);
app.use('/music/youtube', youtube);
app.use('/music/song_map', song_map);

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

//INITIALIZE GLOBAL CACHE
var NodeCache = require( "node-cache" );
global.default_cache = new NodeCache();

global.app_root_dir = String(String(__dirname).replace('/server', '/client'));
global.fs_root_dir = path.join(String(__dirname)).replace('/server', '/client/private/files');

var jsondb = require('node-json-db');
global.jsdb = {};
global.jsdb.music = new jsondb('db_music', true, false);
global.jsdb.playlists = new jsondb('db_playlists', true, false);

require('./controllers/song_map').get_data(function() {
    console.log('songs have been mapped');
}, function(err) {
    console.log('error mapping songs:');
    console.dir(err);
});

module.exports = app;