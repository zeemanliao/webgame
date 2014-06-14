
var util = require('../util/tool');
var Game = require('../game');
var settings = Game.settings;

var id=0;
function Enemy() {
  this.id = 0;
  this.data = {
  	nam:'',
  	hp:99999,
  	dmg:0,
  	mag:0,
  	def:99999,
  	skill:0
  };
  
}

module.exports = Enemy;

Enemy.create = function (data, callback) {

	return callback(null, tem);
}
