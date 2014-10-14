// init modules
var COOKIE = {
    SECRET: "zdjwoi3dsl6ase9nqmwf7jeioa3sdjfodfjekw23jasasf",
    KEY: 'express.sid'
};

var express = require('express');
var helmet = require('helmet');
var fs = require('fs');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var memoryStore = session.MemoryStore;
var app = express();
var game = require('./lib/game');
var socket_route = require('./lib/route');
var sessionStore = new memoryStore();

app.set('env', process.env.NODE_ENV || 'development');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser(COOKIE.SECRET));
app.use(session({
    KEY: COOKIE.KEY,
    secret: COOKIE.SECRET,
    cookie: {httpOnly: true, secure: true},
    store: sessionStore
}));
app.use(function(req, res, next){
    res.locals.session = req.session;
    next();
});
app.use(express.static(path.join(__dirname, 'public')));

//routes
require('./routes/index')(app);


// starting http and http servers
var http = require('http').createServer(app).listen(app.get('port'), function(){
    console.log("http server listening on port" + app.get('port'));
});

// starting socket.io & session handler
var serverIO = require('socket.io').listen(http);
var SessionSockets  = require('session.socket.io-express4');
var io = new SessionSockets(serverIO, sessionStore, cookieParser);

io.use(function (socket, next) {
 var handshake = socket.handshake;
  if (handshake.headers.cookie) {
  cookieParser()(handshake, {}, function (err) {
  handshake.sessionID = connect.utils.parseSignedCookie(handshake.cookies[config.session.key], config.session.secret);
    handshake.sessionStore = config.session.store;
    handshake.sessionStore.get(handshake.sessionID, function (err, data) {
      if (err) return next(err);
      if (!data) return next(new Error('Invalid Session'));
      handshake.session = new session.Session(handshake, data);
      next();
    });
   });
 }
 else {
  next(new Error('Missing Cookies'));
 }
});

game.load(io.sockets);
socket_route(io, game);