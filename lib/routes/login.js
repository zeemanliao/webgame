var tool = require('../util/tool.js');

module.exports = {
	checkAndUpdateVersion:function(player, localVersion, callback) {
		if (tool.isUndefinedOrNull(localVersion) ||
				this.game.components.login.isDiffentVersion(localVersion)) {
			this.game.components.login.getLocalStorage(player, function(err, data){
				if (err)
					return callback(err);
				
				player.emit({login:{updateLoaclStorage:data}});
			});
		
		} else {
			player.emit({login:{updateLoaclStorage:null}});
		}
		callback(null);
	},

	getLocalStorageVersion:function(player, callback) {
		player.emit({login:{getVersion:1}});
		callback(null);
	},

	loadAllData:function(player, callback) {
		try {
			var _data = {};

			_data.chara = {
				update:player.data.getInfo()
			};

			_data.guest = {
				add:this.game.components.guest.getAllPlayer()
			}
			
			_data.login = {ready:true};
			player.emit(_data);
		} catch (e) {
			return callback(e);
		}
		return callback(null);
	}
}