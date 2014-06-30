var CharaBase = require('./class/CharaBase');
var CharaAccess = require('./class/CharaAccess');

function Player(data) {
	Base.call(this);
	this.data = data;
}

util.inherits(Player, CharaBase);

module.exports = Player;

Player.prototype.save = function() {

}

Player.prototype.move = function() {

}

Player.prototype.emit = function() {
	
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