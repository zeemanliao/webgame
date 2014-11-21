/*
 * GET home page.
 */
var tool = require('../lib/util');
var appInfo = tool.require('package.json');
var xss = require('escape-html');
var fs = require('fs');
var path = require('path');
var basePath = path.dirname(process.mainModule.filename);
var appTitle = appInfo.name;
var Loginer = require('../lib/Loginer');
//var tool = require('../lib/util/tool');
var Loader = tool.require('lib/data/loader/DataLoader');
var PlayerAccess = tool.require('lib/data/db/PlayerAccess');
var loader = new Loader();


loader.setPath(path.join(basePath, appInfo.path.javaScriptClass));
loader.setInterval(5000);
loader.runInterval();
loader.load();

module.exports = function(app) {
    var lang = app.get('lang');
    
    app.get('/top', function(req, res, next) {
        if (!req.session.login)
            return res.redirect('/');

        delete req.session.login;
        
        if (tool.isUndefinedOrNull(req.session.loginKey)) {
            res.redirect('/');

        } else {

            var js = '';
            var fileData = loader.get();

            for (var i in fileData) {
                js += fileData[i].data + '\n';
            }
            var loadData = {
                title: appTitle,
                settings: appInfo.game,
                lang: lang,
                loginKey: req.session.loginKey,
                host: req.headers.host,
                classjs: js
            };
            res.render('top', loadData);

        }
    });

    app.get('/admin', function(req, res, next) {
        if (req.session.playerID && req.session.admin) {
            res.render('admin', {
                title: appTitle,
                settings: appInfo.game,
                lang: lang,
                host: req.headers.host
            });
        } else {
            res.redirect('/');
        }
    });

    app.get('/', function(req, res, params) {
        //res.render('index', { title: appTitle,subtitle:'Home Page' });
        login_page(res);
    });

    app.get('/login', function(req, res, params) {
        login_page(res);
    });

    app.get('/logout', function(req, res, next) {
        req.session.destroy();
        res.redirect('/');
    });

    app.post('/login', function(req, res, next) {

        if (req.body.acc == null || req.body.acc == '')
            return login_page(res, lang.err('E0001')); //請輸入帳號!

        if (req.body.pwd == null || req.body.pwd.trim() == '')
            return login_page(res, lang.err('E0002')); //請輸名稱!

        var acc = req.body.acc.trim();
        PlayerAccess.getByAccount(
            acc,
            function(err, player) {

              if (err)
                  return login_page(res, err);

              if (!player)
                  return login_page(res, lang.err('E0004') + '2'); //帳號或密碼有誤!

              if (player.pwd != req.body.pwd.trim())
                  return login_page(res, lang.err('E0004') + '1'); //帳號或密碼有誤!

              Loginer.createLoginKey({
                  clientIP: req.ip,
                  playerID: player.id
              }, function(err, loginKey) {
                  if (err)
                      return login_page(res, '登入失敗:請重新登入' + err.message);

                  req.session.loginKey = loginKey;
                  req.session.login = true;
                  res.redirect('/top');
              });
            });
    });
    app.get('/test', function(req, res, params) {
        res.render('test');
    });

    app.get('/reg', function(req, res, params) {
        reg_page(res, '');
    });

    app.post('/reg', function(req, res, next) {
        if (verifyUserInputData(req.body.acc))
            return reg_page(res, lang.err('E0001'));

        if (verifyUserInputData(req.body.nam))
            return reg_page(res, lang.err('E0002'));

        if (verifyUserInputData(req.body.pwd1))
            return reg_page(res, lang.err('E0003'));

        if (req.body.pwd1 != req.body.pwd2)
            return reg_page(res, lang.err('E0005'));

        var source = 'FB',
            acc = req.body.acc.trim(),
            nam = req.body.nam.trim();

        PlayerAccess.getByAccountOrName({
                acc: acc,
                nam: nam
            },
            function(err, Player) {
                if (err)
                    return reg_page(res, err);

                if (Player && Player.acc == acc)
                    return reg_page(res, lang.err('E0010'));

                if (Player && Player.nam == nam)
                    return reg_page(res, lang.err('E0011'));

                var Player = new Player();
                Player.data.acc = acc;
                Player.data.pwd = req.body.pwd1;
                Player.data.nam = nam;
                Player.data.source = source;
                Player.save(function(err) {
                    if (err)
                        return reg_page(res, err);

                    return res.redirect('/login');
                });
                //console.log(Player.data);
            });

    });
    app.get('/logout', function(req, res, params) {
        req.logout();
        res.redirect('/');
    });
    function reg_page(res, msg) {
        res.render('reg', {
            title: appTitle,
            subtitle: lang.txt('T0004'),
            lang: lang,
            photo: '',
            name: '',
            msg: msg
        });
    }

    function login_page(res, msg) {
        res.render('login', {
            title: appTitle,
            subtitle: lang.txt('T0003'),
            lang: lang,
            photo: '',
            name: '',
            msg: msg || ''
        });
    }

    function verifyUserInputData(data) {
        if (!data)
            return false;

        if (data != xss(data.trim()))
            return false;
    }

};

