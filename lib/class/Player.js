var CharaBase = require('./CharaBase');
var CharaAccess = require('./db/CharaAccess');
var util = require('util');

function Player(data) {
	Base.call(this);
	this.data = data;
	this.rooms = {};
}

util.inherits(Player, CharaBase);

module.exports = Player;

Player.prototype.save = function() {

}

Player.prototype.move = function() {

}

Player.prototype.joinRoom = function(roomName) {
	this.rooms[roomName] = roomName;
	this.socket.join(roomName);
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
	CharaAccess.getByAccount(account,
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
	CharaAccess.getByID(playerID,
		function(err, playerData){
			if (err)
				return callback(err);

			if (!playerData)
				return callback(null, null);

			var _player = new Player(playerData);
			return callback(null, _player);
	});
}