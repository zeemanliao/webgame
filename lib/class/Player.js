var PlayerDataBase = require('./base/PlayerDataBase');
var PlayerAccess = require('./db/PlayerAccess');
var tool = require('../util/tool');
var util = require('util');

function Player(data) {
	this.data = data;
	PlayerDataBase.call(this);
	this.id = data.id;
	this.language = 'cht';
	this.rooms = {};
	this.mapRoom = null;
	this.socket = null;
}

util.inherits(Player, PlayerDataBase);

module.exports = Player;

Player.prototype.save = function() {
	PlayerAccess.save(this.id, function(err){
		console.log(err);
	});
}

Player.prototype.joinTeam = function(team) {
	this.team = team;
	this.joinRoom('team_' + this.team.id);
}

Player.prototype.joinRoom = function(roomName) {
	if (roomName in this.rooms)
		return;

	this.rooms[roomName] = roomName;
	this.socket.join(roomName);
}

Player.prototype.joinMap = function(map) {
	this.leaveMap();

	this.map = map;
	this.joinRoom('map_' + this.map.id);
}

Player.prototype.leaveTeam = function() {
	if (!tool.isUndefinedOrNull(this.team)){
		this.leaveRoom('team_' + this.team.id);
		this.team.leave(this.id);
		delete this.team;
	}
}

Player.prototype.leaveMap = function() {
	if (!tool.isUndefinedOrNull(this.map)){
		this.leaveRoom('map_' + this.map.id);
		delete this.map;
	}
}

Player.prototype.leaveRoom = function(roomName) {

	if (roomName.lastIndexOf("%")){
		var _filter = "^"+roomName.replace(/%/g,"");
		_filter = RegExp('/'+_filter+'/i');
		for (var i in this.rooms) {
			if (this.rooms[i].search(_filter)==0){
				this.socket.leave(i);
				delete this.rooms[i];
			}
		}

	} else {
		delete this.room[roomName];
		this.socket.leave(roomName);
	}
}

Player.prototype.emit = function(data) {
	this.socket.emit('update Data', data);
}

Player.prototype.showMessage = function(msg, args) {
	if (!msg)
		return;

	var _msg = _msgsg;

	if (typeof(args)==='string') {
		_msg = _msg.replace('$', args);
	} else if (typeof(args)==='array'){
		for (var i in args){
			var rep = args[i];
			_msg = _msg.replace('$', rep);
		}
	}

	this.socket.emit('show message', {msg:m});
}

Player.getByAccount = function(account, callback) {
	PlayerAccess.getByAccount(account,
		function(err, playerData){
			if (err)
				return callback(err);

			if (!playerData)
				return callback(null, null);

			var _player = new Player(playerData);
			return callback(null, _player);
	});
}

Player.getByID = function(playerID, callback) {
	PlayerAccess.getByID(playerID,
		function(err, playerData){
			if (err)
				return callback(err);

			if (!playerData)
				return callback(null, null);

			var _player = new Player(playerData);
			PlayerAccess.putCacheData(playerData);
			return callback(null, _player);
	});
}