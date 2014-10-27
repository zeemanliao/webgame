// init modules
var express = require('express');
var fs = require('fs');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes');
var session = require('express-session');
var app = express();
var http = require('http');
var Game = require('./lib/game');
var socket_route = require('./lib/route');
var sessionStore = new session.MemoryStore();
var serverSettings = require('./lib/settings').server;

app.set('env', process.env.NODE_ENV || 'development');

// view engine setup
app.set('port', process.env.PORT || 1234);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
;

//app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser(serverSettings.cookie_secret));
app.use(session({
    KEY: serverSettings.cookie_key,
    secret: serverSettings.cookie_secret,
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
  cookieParser(serverSettings.cookie_secret)(req, null, function() {});
  
  socket.sessionID = req.signedCookies[serverSettings.cookie_key] || req.cookies['connect.sid'];
  sessionStore.get(socket.sessionID, function(err, session) {
                  if (err || !session) {
                      //accept(null, false);
                  } else {
                      socket.handshake.session = session;
                  }
                  next();
              });
  
});
var game = new Game();

//game.load(io.sockets);
//socket_route(io, game);

