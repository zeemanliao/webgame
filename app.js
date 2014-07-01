/**
 * Module dependencies.
 */
var game = require('./lib/game');
var cluster = require('cluster'),
    express = require('express'),
    routes = require('./routes'),
    socket_route = require('./lib/route'),
    settings = require('./lib/settings'),
    cookie = express.cookieParser(settings.cookie_secret),
    store = new express.session.MemoryStore(),
    session = express.session({
        key: settings.cookie_key,
        secret: settings.cookie_secret,
        store: store
    }),
    http = require('http'),
    path = require('path'),
    app = express(),
    cpuCount = require('os').cpus().length;

if (cluster.isMaster) {

    // Create a worker for each CPU
    //for (var i = 0; i < cpuCount; i += 1) {
    for (var i = 0; i < 1; i += 1) {
        cluster.fork();
    }
    // Listen for dying workers
    cluster.on('fork', function(worker) {

        // Replace the dead worker,
        // we're not sentimental
        console.log('Worker A ' + worker.id + ',pid=' + worker.process.pid + '.............fork');
    });
    // Listen for dying workers
    cluster.on('exit', function(worker, code, signal) {

        // Replace the dead worker,
        // we're not sentimental
        console.log('Worker B ' + worker.id + ',pid=' + worker.process.pid + '.............died');
        cluster.fork();
    });

} else {
    // all environments
    app.set('port', process.env.PORT || 1234);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(cookie);
    app.use(session);

    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));

    // development only
    if ('development' == app.get('env')) {
        app.use(express.errorHandler());
    }

    routes(app);

    var io = require('socket.io').listen(
        http.createServer(app).listen(app.get('port'), function() {
            console.log('Express server listening on port ' + app.get('port'));
        }), {
            log: true
        }
    );
    // Configuracoes do Socket.IO
    io.set('authorization', function(data, accept) {
        cookie(data, {}, function(err) {
            if (!err) {
                var sessionID = data.signedCookies[settings.cookie_key];
                store.get(sessionID, function(err, session) {
                    if (err || !session) {
                        accept(null, false);
                    } else {
                        data.session = session;
                        accept(null, true);
                    }
                });
            } else {
                accept(null, false);
            }
        });
    });

    game.load(io.sockets);
    socket_route(io, game);
}
