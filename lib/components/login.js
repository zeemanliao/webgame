var tool = require('../util/tool.js');
var Player = require('../class/Player');
var LoginKeyAccess = require('../class/db/LoginKeyAccess');

module.exports = {
	loginAndJoin:function(loginKeyID, callback) {
		try {
			var self = this;

			if (tool.isUndefinedOrNull(loginKeyID))
				return callback(new self.game.GameError('E0021'));

			LoginKeyAccess.getPlayerIDByLoginKey(loginKeyID, function(err, playerID){

		    if (!tool.isNumeric(playerID))
		    	return callback(new self.game.GameError('E0008'));

		    LoginKeyAccess.deleteLoginKey(loginKeyID,function(){});
		    LoginKeyAccess.deleteOverTime(function(){});

		    var _player = self.game.players[playerID];
		    if (!tool.isUndefinedOrNull(_player) && 
		    		!tool.isUndefinedOrNull(_player.socket)) 
		        return callback(new self.game.GameError('E0007'));

		    Player.getByID(
		      playerID,
		      function(err, player) {
		        if (err)
		          return callback(err);

		        if (!player)
		        	return callback(new self.game.GameError('E0009'));
		          
						self.game.players[player.id] = player;
						self.game.nickname[player.data.nam]=player.id;
						callback(null, player);
		    });
	    });
  	} catch (e) {
  		return callback(e);
  	}
  	return;
  },

	leave:function(player, callback){
		try {
			if (tool.isUndefinedOrNull(player) || 
					tool.isUndefinedOrNull(player.id))
				return;

			var self = this;

			player.save(function(err){
				if (err) {
					self.log('game.leave存檔失敗:'+err);

				}else{
					//移出隊伍
					player.leave();
					delete nickname[player.data.nickname];
					delete players[player.id];
					self.log(player.id+'.......................' +'.saved() Logout');
				}

				if (callback)
					callback(null);
			});
		} catch (e) {
			cacllback(e);
		}
	},

	isDiffentVersion:function(localVersion) {
		for (var i in this.game.publicData.version) {
			if (this.game.publicData.version[i] != localVersion[i]) {
				return true;
			}
		}
		return false;
	},

	getLocalStorage:function(player, callback){
		callback(null, this.game.publicData);
	}
}