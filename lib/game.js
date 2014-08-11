var game = module.exports = {};
var util = require('util');
var tool = require('./util/tool');
var Player = require('./class/Player');
var lang = require('./class/lang');
var GameError = require('./class/exception/GameError');
var GameWarning = require('./class/exception/GameWarning');
var	players = {};
var nickname = {};
var rooms = {};
var tick = 0;
var socket = null;
var publicData = require('./class/GameData');
var	routes = require('./class/GameRoute')(game);
var components = require('./class/GameComponent')(game);
var settings = require('./settings');
var skill = require('./class/Skill');
var fs = require('fs');
var path = require('path');

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
game.components = components;
game.routes = routes;
game.publicData = publicData;

game.log = function(msg, args) {
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

game.in = function(room, data) {
	if (tool.isUndefinedOrNull(socket))
		console.log(data);
	else
		socket.in(room).emit('update Data',data);
}

game.inError = function(room, e) {
  var _msg = e.message + '</br>' + e.stack ? e.stack:'';

  if (tool.isUndefinedOrNull(socket))
  	console.log(_msg);
  else
  	socket.in(room).emit('show error2', {msg: msg});
}
/*
	載入資料
*/
game.load = function (data) {
	socket = data;
};

