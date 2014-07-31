var PlayerDataBase = require('./base/PlayerDataBase');
var PlayerBattleBase = require('./base/PlayerBattleBase');
var PlayerRoomBase = require('./base/PlayerRoomBase');
var PlayerAccess = require('./db/PlayerAccess');
var ItemAccess = require('./db/ItemAccess');
var Item = require('./Item');
var settings = require('../settings');
var tool = require('../util/tool');
var util = require('util');
var Bag = require('./Bag');
var Storage = require('./Storage');
var Equipment = require('./Equipment');

function Player(data) {
	this.data = new PlayerDataBase(data);
	this.room = new PlayerRoomBase(this);
	this.battle = new PlayerBattleBase(this);
	this.bag = new Bag(this.data.bag);
	this.storage = new Storage(this.data.storage);
	this.equipment = new Equipment(0);
	this.team = null;
	this.id = data.id;
	this.language = 'cht';
	this.socket = null;

}

module.exports = Player;

Player.prototype.save = function() {
	PlayerAccess.save(this.id, function(err){
		console.log(err);
	});
}

Player.prototype.joinTeam = function(team) {
	this.team = team;
	this.room.join('team_' + this.team.id);
}

Player.prototype.joinMap = function(map) {
	this.leaveMap();

	this.map = map;
	this.room.join('map_' + this.map.id);
}

Player.prototype.leaveTeam = function() {
	if (!tool.isUndefinedOrNull(this.team)){
		this.room.leave('team_' + this.team.id);
		this.team.leave(this.id);
		delete this.team;
	}
}

Player.prototype.leaveMap = function() {
	if (!tool.isUndefinedOrNull(this.map)){
		this.room.leave('map_' + this.map.id);
		delete this.map;
	}
}

Player.prototype.emit = function(data) {
	if (tool.isUndefinedOrNull(this.socket))
		console.log(data);
	else
		this.socket.emit('update Data', data);
}

Player.prototype.reflushchangeData = function(){
	this.emit({chara:{update:this.data.getChangeData()}});
	this.data.changeData = {};
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

			ItemAccess.getByPlayerID(_player.id, function(err, items){
				if (err)
					return callback(err);

				if (!tool.isUndefinedOrNull(items)){
					for (var i in items) {
						var _item = new Item(items[i]);
						
						switch (_item.data.storage) {
							case settings.game.storageType.bag:
								_player.bag.append(_item);
								break;
							case settings.game.storageType.storage:
								_player.storage.append(_item);
								break;
							case settings.game.storageType.equipment:
								_player.equipment.append(_item);
								break;
						}
					}
				}
				return callback(null, _player);
			});
			
	});
}