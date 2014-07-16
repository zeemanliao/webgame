var tool = require('../../util/tool');

function PlayerRoomBase(parent) {
	this.parent = parent;
	this.rooms = {};
	this.mapRoom = null;
}

module.exports = PlayerRoomBase;

PlayerRoomBase.prototype.leave = function(roomName) {
	delete this.rooms[roomName];
	this.parent.socket.leave(roomName);
}

PlayerRoomBase.prototype.multiLeave = function(roomName) {
	var _filter = RegExp('/^'+roomName+'/i');
	
	for (var i in this.rooms) {
		if (this.rooms[i].search(_filter)==0){
			this.parent.socket.leave(i);
			delete this.rooms[i];
		}
	}
}

PlayerRoomBase.prototype.join = function(roomName) {
	if (roomName in this.rooms)
		return;

	this.rooms[roomName] = roomName;
	this.parent.socket.join(roomName);
}