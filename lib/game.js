var game = module.exports = {};
var util = require('util');
var tool = require('./util/tool');
var Player = require('./class/Player');
var lang = require('./class/lang');
var GameError = require('./class/exception/GameError');
var GameWarning = require('./class/exception/GameWarning');
var	players = {},
		nickname = {},
		rooms = {},
		tick =0,
		routes = require('./class/GameRoute')(game),
		socket = null,
		settings = require('./settings'),
		skill = require('./class/Skill');

var fs = require('fs'),
		path = require('path');


var db = require('./class/GameData');
/*
	共用變數區
*/

game.players = players;
game.nickname = nickname;
game.settings = settings;
game.rooms = rooms;		//所有玩家所在地點
game.tick = tick;
game.lang = lang;
game.socket=socket;
game.skill = skill;
game.GameError = GameError;
game.GameWarning = GameWarning;
game.db = db;
/*
	物件區
*/
game.routes = routes;

game.log = function(msg,args) {
	var _msg=msg;
	if (typeof(args)==='string') {
		_msg = _msg.replace('$',args);
	} else if (typeof(args)==='array'){
		for (var i in args){
			var rep = args[i];
			_msg = _msg.replace('$',rep);
		}
	}
	console.log(_msg);
}


game.in = function(ch,data) {
	socket.in(ch).emit('update Data',data);
}

/*
	載入資料
*/
game.load = function (data) {

	socket = data;


	};

/*
	取得目前所有登入人員
 */
game.guest = function() {
	var reguest = [];
	for (var v in players) {
		var g ={
			nam: players[v].data.nam,
			cex: players[v].data.cex,
			level: players[v].data.level,
			photo: players[v].data.photo
		}
		reguest.push(g);
	}
	return reguest;
}
/*
	Client登入後會先傳回Client db版本資訊
	更新Client Local Storage
*/
game.updateLocalStorage = function(player,data){

	var _redata = {player:{update:player.allData()},
								sys:{
									conf:settings.game,
									ver:db.version,
									db:{}
								},
								guest:{
									add:this.guest()
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

game.leave=function(player, callback){
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
};

game.loginAndJoin = function(playerID, callback) {
    if (!tool.isNumeric(playerID))
    	return callback(game.lang.err('E0008'));

    var _player = player[playerID];
    if (_player.route) 
        return callback(game.lang.err('E0007'));

    Player.getByID(
      playerID,
      function(err, player) {
        if (err)
          return callback(err);

        if (!player)
        	return callback(lang.err('E0009'));
          
        player = _player;
				players[player.id] = player;
				nickname[player.data.nam]=player.id;
    });
};


