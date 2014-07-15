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
		tick = 0,
		socket = null;
var	routes = require('./class/GameRoute')(game);
var components = require('./class/GameComponent')(game);
var settings = require('./settings');
var skill = require('./class/Skill');

var fs = require('fs'),
		path = require('path');

var publicData = require('./class/GameData');
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
game.publicData = publicData;
game.components = components;
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

game.in = function(room, data) {
	socket.in(room).emit('update Data',data);
}

/*
	載入資料
*/
game.load = function (data) {
	socket = data;
};
