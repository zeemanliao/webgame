/**
 * Module dependencies.
 */

var game = require('./lib/game');
var express = require('express'),
    routes = require('./routes'),
    socket_route = require('./lib/route'),
    settings = require('./lib/settings'),
    cookieParser = express.cookieParser(settings.cookie_secret),
    sessionStore = new express.session.MemoryStore(),
    session = express.session({
        key: settings.cookie_key,
        secret: settings.cookie_secret,
        store: sessionStore
    }),
    http = require('http'),
    path = require('path'),
    app = express();
// all environments

app.set('port', process.env.PORT || 1234);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(cookieParser);
app.use(session);

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
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
io.set('authorization', function (data, accept) {
    if(!data.headers.cookie) {
        return accept('No cookie transmitted.', false);
    }
        //console.log(sessionStore);

    cookieParser(data, {}, function(parseErr) {
        if(parseErr) { return accept('Error parsing cookies.', false); }

        var sidCookie = (data.secureCookies && data.secureCookies[settings.cookie_key]) ||
                        (data.signedCookies && data.signedCookies[settings.cookie_key]) ||
                        (data.cookies && data.cookies[settings.cookie_key]);

        sessionStore.set(sidCookie, function(err, session) {

            if (err || !session) {
                accept('Error', false);
            } 
                        else {
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
