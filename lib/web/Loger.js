function Loger() {

}

Loger.prototype.login = function(acc, pwd, callback) {
  PlayerAccess.getByAccount(
      acc,
      function(err, player) {

          if (err)
              return callback(err);

          if (!player)
              return callback('E0004'); //帳號或密碼有誤!

          if (player.pwd != req.body.pwd.trim())
              return callback('E0004'); //帳號或密碼有誤!

          var _keyID = tool.getRandomWord({
              length: 20
          }) + '_' + player.id;

          LoginKeyAccess.saveLoginKey({
              keyID: _keyID,
              playerID: player.id
          }, function(err) {
              if (err)
                  return login_page(res, '登入失敗:請重新登入' + err.message);

              req.session.loginKeyID = _keyID;
              req.session.login = true;
              res.redirect('/top');
          });
      });
}

module.exports = Loager;