/*
 * GET home page.
 */
var appinfo = require('../package.json'),
    xss = require('escape-html');
var fs = require('fs'),
    path = require('path');
var lang = require('../lib/class/lang');
var settings = require('../lib/settings'),
    passport = require('passport'),
    CharaAccess = require('../lib/class/db/CharaAccess'),
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
      if (req.session.id) {
          var js = '';

          for (var i in class_js) {
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
      if (req.session.playerID && req.session.admin) {
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
      return login_page(res, lang.err('E0001')); //請輸入帳號!

    if (req.body.pwd == null || req.body.pwd.trim() == '')
      return login_page(res, lang.err('E0002')); //請輸名稱!

    var acc = req.body.acc.trim();
    CharaAccess.getByAccount(
      acc,
      function(err, chara) {

        if (err) 
          return login_page(res, err);

        if (!chara)
          return login_page(res, lang.err('E0004')+'2'); //帳號或密碼有誤!

        if (chara.pwd != req.body.pwd.trim())
          return login_page(res, lang.err('E0004')+'1'); //帳號或密碼有誤!

        req.session.playerID = chara.id;
        res.redirect('/top');

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

    CharaAccess.getByAccountOrName({acc:acc,nam:nam},
    function(err, chara) {
      if (err)
        return reg_page(res, err);

      if (chara && chara.acc == acc)
        return reg_page(res, lang.err('E0010'));
      
      if (chara && chara.nam == nam)
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
  // Redirect the Player to Facebook for authentication.  When complete,
  // Facebook will redirect the Player back to the application at
  //     /auth/facebook/callback
  app.get('/auth/facebook', passport.authenticate('facebook'));

  // Facebook will redirect the Player to this URL after approval.  Finish the
  // authentication process by attempting to obtain an access token.  If
  // access was granted, the Player will be logged in.  Otherwise,
  // authentication has failed.
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/login',
      failureRedirect: '/'
    }));
  // Redirect the Player to Google for authentication.  When complete, Google
  // will redirect the Player back to the application at
  //     /auth/google/return
  app.get('/auth/google', passport.authenticate('google'));

  // Google will redirect the Player to this URL after authentication.  Finish
  // the process by verifying the assertion.  If valid, the Player will be
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
        subtitle: lang.txt('T0004'),
        lang: lang,
        photo: '',
        name: '',
        msg: msg
    });
}

function login_page(res, msg) {
    res.render('login', {
        title: apptitle,
        subtitle: lang.txt('T0003'),
        lang: lang,
        photo: '',
        name: '',
        msg: msg
    });
}

function verifyUserInputData(data){
  if (!data)
    return false;

  if (data != xss(data.trim()))
    return false;
}