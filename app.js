var appInfo = require('./package.json');
var express = require('express');
var fs = require('fs');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressApp = express();
var http = require('http');
var http_route = require('./routes/http');
var session = require('express-session');
var Lang = require('./lib/Lang');
var lang = Lang.create(require(path.join(__dirname, 'lang' , appInfo.language + '.json')));

/*
  Configure Express App
*/

expressApp.set('env', process.env.NODE_ENV || 'development');
// view engine setup
expressApp.set('port', process.env.PORT || appInfo.port);
expressApp.set('view engine', 'ejs');
expressApp.set('views', path.join(__dirname, appInfo.path.views));
expressApp.set('lang', lang);


//expressApp.use(favicon());
expressApp.use(logger('dev'));
expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({ extended: true }));
expressApp.use(cookieParser(appInfo.cookie.secret));
expressApp.use(express.static(path.join(__dirname, 'public')));

expressApp.use(session({
    KEY: appInfo.cookie.key,
    secret: appInfo.cookie.secret,
    resave: true,
    saveUninitialized: true
}));

expressApp.use(function(req, res, next){
    res.locals.session = req.session;
    next();
});
/*
  http route
*/
http_route(expressApp);
var socket = require('socket.io').listen(
    http.createServer(expressApp).listen(expressApp.get('port'), 
        function() {
            console.log('Express And Game server listening on port ' + expressApp.get('port'));
        })
    , {
      'log': true
    }
);
var socket_route = require('./routes/socket');
var Game = require('./lib/Game');
var ClientMessage = require('./lib/error/ClientMessage');

var gameSettings = require('./lib/settings')

var game = new Game(gameSettings);
game.set('lang', lang);
game.use('error', ClientMessage);
game.use('join', Joiner);
/*
  Socket route
*/
socket_route(socket, game);

