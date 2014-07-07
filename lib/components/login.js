var tool = require('../util/tool.js');
var Player = require('../class/Player');
module.exports = {
	loginAndJoin:function(playerID, callback) {
		var self = this;
    if (!tool.isNumeric(playerID))
    	return callback(self.game.GameError('E0008'));

    var _player = player[playerID];
    if (_player.route) 
        return callback(self.game.GameError('E0007'));

    Player.getByID(
      playerID,
      function(err, player) {
        if (err)
          return callback(self.game.GameError(err));

        if (!player)
        	return callback(self.game.GameError('E0009'));
          
        player = _player;
				players[player.id] = player;
				nickname[player.data.nam]=player.id;
    });
  },

	getAllPlayer:function() {
		var _returnData = [];
		for (var v in this.game.players) {
			var g ={
				nam: this.game.players[v].data.nam,
				cex: this.game.players[v].data.cex,
				level: this.game.players[v].data.level,
				photo: this.game.players[v].data.photo
			}
			_returnData.push(g);
		}
		return _returnData;
	},

	leave:function(player, callback){
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
	},

	updateLocalStorage:function(player,data){

		var _redata = {player:{update:player.allData()},
									sys:{
										conf:settings.game,
										ver:db.version,
										db:{}
									},
									guest:{
										add:components.guest.getAllPlayer()
									},
									ready:{load:1}			//登入後前端資料載入動作
								};

		for (var v in db.version) {
			if (!data){						//未載入過
				_redata.sys.db[v]=db[v];
			}else	if (data[v] && data[v] == ver[v]){	//同一版本
	//不動作1
			} else {							//不同版本
				_redata.sys.db[v]=db[v];
			}
		}
		player.emit(_redata);
		player.socket.broadcast.emit("update Data",{guest:{
				add:[{
					nam:player.data.nam,
					cex:player.data.cex,
					level:player.data.level,
					photo:player.data.photo
				}]
		}});
	}
}