/*
 * GET home page.
 */
var appinfo = require('../package.json'),
    xss = require('escape-html');
var fs = require('fs'),
    path = require('path');
var util = require('../lib/util/tool.js');
/*
function GameError(msg){
	this.name='Game Error';
	this.message=(msg || '');
}
GameError.prototype = Error.prototype;
require('../lib/fbauth');
*/

var settings = require('../lib/settings'),
    passport = require('passport'),
    User = require('../lib/obj/user'),
    apptitle = appinfo.name;

var js_path = path.dirname(process.mainModule.filename);

var class_js = new Array();

function loadJS() {
    fs.readdirSync(js_path + '/views/js/class').forEach(function(filename) {

        if (!/\.cjs$/.test(filename)) {
            return;
        }
        fs.stat(js_path + '/views/js/class/' + filename, function(err, stat) {

            var d = new Date(stat.mtime);
            var mtime = d.getTime();

            //console.log(mtime);  
            if (!class_js[filename] || class_js[filename].mtime != mtime) {

                fs.readFile(js_path + '/views/js/class/' + filename, 'utf8', function(err, data) {
                    if (err) {
                        return console.log(err);
                    }
                    class_js[filename] = {
                        mtime: mtime,
                        data: data,
                        filename: filename
                    };
                    console.log('js class Load ..... %s', filename);
                });
            }
        });

    });

}

module.exports = function(app, Store) {
    loadJS();
    setInterval(loadJS, 2000);

    app.get('/top', function(req, res, next) {
        if (req.session.uid) {
            var js = '';

            for (var i in class_js) {
                //console.log(class_js[i].filename);
                js += class_js[i].data;
            }
            var loadData = {
                title: apptitle,
                settings: settings,
                lang: lang,
                host: req.headers.host,
                classjs: js
            };
            res.render('top', loadData);


        } else {
            res.redirect('/');
        }
    });

    app.get('/admin', function(req, res, next) {
        if (req.session.uid && req.session.admin) {
            res.render('admin', {
                title: apptitle,
                settings: settings,
                lang: lang,
                host: req.headers.host
            });
        } else {
            res.redirect('/');
        }
    });
    app.get('/', function(req, res, params) {
        //res.render('index', { title: apptitle,subtitle:'Home Page' });
        login_page(res, '');
    });
    app.get('/login', function(req, res, params) {
        login_page(res, '');
    });
    app.get('/logout', function(req, res, next) {
        req.session.destroy();
        res.redirect('/');
    });
    app.post('/login', function(req, res, next) {
        if (req.body.acc == null || req.body.acc == '')
            return login_page(res, lang.err.E0001); //請輸入帳號!
        if (req.body.pwd == null || req.body.pwd.trim() == '')
            return login_page(res, lang.err.E0002); //請輸名稱!
        var acc = req.body.acc.trim();
        User.get({
            acc: acc
        }, function(err, chara) {
            if (err) {
                login_page(res, err);
            } else if (chara) {
                if (chara.data.pwd != req.body.pwd.trim()) {

                    login_page(res, lang.err.E0004+'1'); //帳號或密碼有誤!
                } else {
                    req.session.uid = chara.data.uid;
                    res.redirect('/top');
                }
            } else {
                login_page(res, lang.err.E0004+'2'); //帳號或密碼有誤!
            }
        });

    });
    app.get('/test', function(req, res, params) {
        res.render('test');
    });
    app.get('/reg', function(req, res, params) {
        reg_page(res, '');
    });
    app.post('/reg', function(req, res, next) {

        if (req.body.acc == null || req.body.acc.trim() == '')
            return reg_page(res, lang.err.E0001); //請輸入帳號!
        if (req.body.nam == null || req.body.nam.trim() == '')
            return reg_page(res, lang.err.E0002); //請輸名稱!

        if (req.body.pwd1 == null || req.body.pwd1.trim() == '')
            return reg_page(res, lang.err.E0003); //請輸密碼!
        if (req.body.pwd1 != req.body.pwd2)
            return reg_page(res, lang.err.E0005); //密碼兩次輸入不一致!
        if (req.body.nam != xss(req.body.nam))
            return reg_page(res, lang.err.E0006); //你的名稱有不正確的字元!
        var source = 'FB',
            acc = req.body.acc.trim(),
            nam = req.body.nam.trim();

        User.checkAccount({
            acc: acc,
            nam: nam
        }, function(err) {
            if (err)
                return reg_page(res, err);

            var user = new User();
            user.data.acc = acc;
            user.data.pwd = req.body.pwd1;
            user.data.nam = nam;
            user.data.source = source;
            user.save(function(err) {
                if (err)
                    return reg_page(res, err);

                return res.redirect('/login');
            });
            //console.log(user.data);
        });

    });
    // Redirect the user to Facebook for authentication.  When complete,
    // Facebook will redirect the user back to the application at
    //     /auth/facebook/callback
    app.get('/auth/facebook', passport.authenticate('facebook'));

    // Facebook will redirect the user to this URL after approval.  Finish the
    // authentication process by attempting to obtain an access token.  If
    // access was granted, the user will be logged in.  Otherwise,
    // authentication has failed.
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/login',
            failureRedirect: '/'
        }));
    // Redirect the user to Google for authentication.  When complete, Google
    // will redirect the user back to the application at
    //     /auth/google/return
    app.get('/auth/google', passport.authenticate('google'));

    // Google will redirect the user to this URL after authentication.  Finish
    // the process by verifying the assertion.  If valid, the user will be
    // logged in.  Otherwise, authentication has failed.
    app.get('/auth/google/return',
        passport.authenticate('google', {
            successRedirect: '/login',
            failureRedirect: '/'
        }));
    app.get('/logout', function(req, res, params) {
        req.logout();
        res.redirect('/');
    });

};

function reg_page(res, msg) {
    res.render('reg', {
        title: apptitle,
        subtitle: lang.txt.T0004,
        lang: lang,
        photo: '',
        name: '',
        msg: msg
    });
}

function login_page(res, msg) {
    res.render('login', {
        title: apptitle,
        subtitle: lang.txt.T0003,
        lang: lang,
        photo: '',
        name: '',
        msg: msg
    });
}
