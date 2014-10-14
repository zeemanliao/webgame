// init modules
var COOKIE = {
    SECRET: "zdjwoi3dsl6ase9nqmwf7jeioa3sdjfodfjekw23jasasf",
    KEY: 'express.sid'
};

var express = require('express');
var fs = require('fs');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes');
var session = require('express-session');
var memoryStore = session.MemoryStore;
var app = express();
var http = require('http');
var game = require('./lib/game');
var socket_route = require('./lib/route');
var sessionStore = new memoryStore();

app.set('env', process.env.NODE_ENV || 'development');

// view engine setup
app.set('port', process.env.PORT || 1234);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser(COOKIE.SECRET));
app.use(session({
    KEY: COOKIE.KEY,
    secret: COOKIE.SECRET,
    store: sessionStore,
    resave: true,
    saveUninitialized: true
}));
app.use(function(req, res, next){
    res.locals.session = req.session;
    next();
});
app.use(express.static(path.join(__dirname, 'public')));

//routes
routes(app);


// starting http and http servers
/*
var http = require('http').createServer(app).listen(app.get('port'), function(){
    console.log("http server listening on port" + app.get('port'));
});
*/
// starting socket.io & session handler
var io = require('socket.io').listen(
    http.createServer(app).listen(app.get('port'), 
        function() {
            console.log('Express And Game server listening on port ' + app.get('port'));
        })
    , {
      'log': true
    }
);
io.use(function ioSession(socket, next) {
  // create the fake req that cookieParser will expect                          
  var req = {
    "headers": {
      "cookie": socket.request.headers.cookie,
    },
  };
 
  // run the parser and store the sessionID
  cookieParser(COOKIE.SECRET)(req, null, function() {});
  
  socket.sessionID = req.signedCookies['connect.sid'] || req.cookies['connect.sid'];
  sessionStore.get(socket.sessionID, function(err, session) {
                  if (err || !session) {
                      //accept(null, false);
                      console.log('nnnnnnnnnnnnnnnnn');
                  } else {
                      socket.handshake.session = session;
                      socket.handshake.loginKeyID = session.loginKeyID;
                      //accept(null, true);
                      console.log('yyyyyyyyyyyyyyyyy');
                  }
                  next();
              });
  
});
/*
io.set('authorization', function(handshake, accept) {
    //var handshake = socket.handshake;
    cookieParser()(handshake, {}, function(err) {
        if (!err) {
            var sessionID = handshake.signedCookies[COOKIE.KEY];
            console.log(handshake.handshake);
            sessionStore.get(sessionID, function(err, session) {
                if (err || !session) {
                    accept(null, false);
                    console.log('nnnnnnnnnnnnnnnnn');
                } else {
                    handshake.session = session;
                    handshake.loginKeyID = session.loginKeyID;
                    accept(null, true);
                    console.log('yyyyyyyyyyyyyyyyy');
                }
            });
        } else {
            accept(null, false);
        }
    });
});

io.use(function(socket, next) {

    var handshake = socket.handshake;

    if (handshake.headers.cookie) {

        cookieParser()(handshake, {}, function(err) {
            handshake.sessionID = handshake.signedCookies[COOKIE.KEY]; // <- 'connect.sid' > your key could be different, but this is the default 
            handshake.session = sessionStore;
console.log(handshake.signedCookies[COOKIE.KEY]);
            handshake.session.get(handshake.sessionID, function(err, data) {

                if (err) return next(err);

                if (!data) return next(new Error('Invalid Session'));
                console.log(data.loginKeyID);
handshake.session.set(handshake.sessionID, data);
                //handshake.session = session;//new session.Session(handshake, data);

                next();
            });
            
        });

    } else {

        next(new Error('Missing Cookies'));
    }
});

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
*/
game.load(io.sockets);
socket_route(io, game);
