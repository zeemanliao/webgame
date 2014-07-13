var PlayerDataBase = require('./base/PlayerDataBase');
var clone = require('../util/clone');
var util = require('util');
var _id = 0;

function Enemy(data) {
  PlayerDataBase.call(this);
  clone(data,this.data);
  this.id = data.id;
}

util.inherits(Enemy, PlayerDataBase);

module.exports = Enemy;

Enemy.getByID = function (enemyID, callback) {
  var _enemy = new Enemy();
  
  _enemy.id = getID();
  _enemy.baseID = enemyID;
  _enemy.data.id = _enemy.id;
  _enemy.data.nam = '怪'+data;
  _enemy.data.hp = tool.getRnd(100,300);
  _enemy.data.maxhp = _enemy.bdata.hp;
  _enemy.data.dmg = tool.getRnd(10,40);
  _enemy.data.mag = tool.getRnd(10,40);
  _enemy.data.def = tool.getRnd(10,40);
  
	return callback(null, _enemy);
}

function getID(){
  _id ++ ;
  return _id;
}
