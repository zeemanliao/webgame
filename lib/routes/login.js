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

	checkLocalStorageVersion:function(player, callback) {
		player.emit({login:{getVersion:1}});
		callback(null);
	},

	loadAllData:function(player, callback) {
		try {
			var data = {};
			data.chara = {
				update:{
					nam:player.data.nam,
					level:player.data.level,
					gold:player.data.gold,
					vipgold:player.data.vipgold,
					dmg:player.data.dmg,
					mag:player.data.mag,
					def:player.data.def,
					hp:player.data.hp,
					ex:player.data.ex,
					freecex:player.data.freecex,
					retime:player.data.retime,
					cex:player.data.cex,
					photo:player.data.photo
				}
			};
			data.login = {ready:true};
			player.emit(data);
		} catch (e) {
			return callback(e);
		}
		return callback(null);
	}
}