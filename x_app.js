/**
 * Module dependencies.
 */

var game = require('./lib/game');
var express = require('express'),
    routes = require('./routes'),
    socket_route = require('./lib/route'),
    settings = require('./lib/settings');
var cookieParser = require('cookie-parser'); //express.cookieParser(settings.cookie_secret),
//var sessionStore = new express.session.MemoryStore();
var session = require('express-session');/*express.session({
        key: settings.cookie_key,
        secret: settings.cookie_secret,
        store: sessionStore
    });*/
var sessionStore = session.MemoryStore;
var path = require('path');
var app = express();
var http = require('http');
var favicon = require('serve-favicon');
//var methodOverride = require('method-override');
var errorHandler = require('errorhandler');
// all environments

app.set('port', process.env.PORT || 1234);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
//app.use(favicon(__dirname + '/images/public/favicon.ico'));

//app.use(express.logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded());
//app.use(express.methodOverride());
//app.use(methodOverride);
app.use(cookieParser);
app.use(session({
        key: settings.cookie_key,
        secret: settings.cookie_secret,
        resave: true,
        saveUninitialized: true
    }));

//app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(errorHandler());
}

routes(app);

// Configuracoes do Socket.IO
 
//var RedisStore = require('socket.io/lib/stores/redis');
//var redis      = require('socket.io/node_modules/redis');


var io = require('socket.io').listen(
    http.createServer(app).listen(app.get('port'), 
        function() {
            console.log('Express And Game server listening on port ' + app.get('port'));
        })
    , {
      'log': true
    }
);
io.use(function(socket, next) {

    var handshake = socket.handshake;

    if (handshake.headers.cookie) {

        cookieParser(handshake, {}, function(err) {

            handshake.sessionID = handshake.signedCookies[settings.cookie_key]; // <- 'connect.sid' > your key could be different, but this is the default 
            handshake.session = sessionStore;

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
/*
io.set('authorization', function (data, accept) {
    if(!data.headers.cookie) {
        console.log('No cookie transmitted.');
        return accept('No cookie transmitted.', false);
    }
       

    cookieParser(data, {}, function(parseErr) {
        if(parseErr) { 
            console.log('Error parsing cookies.');
            return accept('Error parsing cookies.', false); 
        }

        var sidCookie = (data.secureCookies && data.secureCookies[settings.cookie_key]) ||
                        (data.signedCookies && data.signedCookies[settings.cookie_key]) ||
                        (data.cookies && data.cookies[settings.cookie_key]);

        sessionStore.load(sidCookie, function(err, session) {
            if (err || !session) {
                console.log('Cookie Session Error');
                accept('Error', false);
            } 
            else {
                console.log('Got Session............');
                data.session = session;
                accept(null, true);
            }
        });
    });
});
/*
io.set('authorization', function(data, accept) {
    cookie(data, {}, function(err) {
        if (!err) {
            var sessionID = data.signedCookies[settings.cookie_key];
            store.get(sessionID, function(err, session) {
                if (err || !session) {
                    accept(null, false);
                    console.log('nnnnnnnnnnnnnnnnn');
                } else {
                    data.session = session;
                    data.loginKeyID = session.loginKeyID;
                    accept(null, true);
                    console.log('yyyyyyyyyyyyyyyyy');
                }
            });
        } else {
            accept(null, false);
        }
    });
});
/*
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
