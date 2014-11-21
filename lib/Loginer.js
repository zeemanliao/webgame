var tool = require('./util');
var LoginKeyAccess = tool.require('lib/data/db/LoginKeyAccess');
var PlayerAccess = tool.require('lib/data/db/PlayerAccess');
var md5hash = '3tae5lns';

module.exports = {
	createLoginKey:function (info, callback) {
		var _playerID = info.playerID || '';
		var _clientIP = info.clientIP || '';

    var _loginKey = makeLoginKey(_clientIP, _playerID);

    LoginKeyAccess.saveLoginKey({
        loginKey: _loginKey,
        playerID: _playerID
    }, function(err) {
        if (err)
            return callback(err);

        callback(null, _loginKey);
    });

	},
	verifyLoginKey:function (info) {
		var _clientIP = info.clientIP || '';
		var _loginKey = info.loginKey || '';

		var _arr = _loginKey.split('_');

		if (_arr.length !=3)
			return false;

		return _arr[2] == tool.md5hash(_clientIP + md5hash);
	},
	login:function (loginKey, callback) {
		LoginKeyAccess.getPlayerIDByLoginKey(loginKey,
			function(err, playerID){
				if (err)
					return callback(err);

				if (playerID == null)
					return callback('無效的入代碼');

				PlayerAccess.getByID(playerID, 
					function(err, player) {
					if (err)
						return callback(err);

					callback(null, player);
				});
			});
	}
}

function makeLoginKey(clientIP, playerID) {
	return tool.getRandomWord({length: 10}) + 
				'_' + playerID +
				'_' + tool.md5hash(clientIP + md5hash);
}