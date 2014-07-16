var PlayerDataBase = require('./base/PlayerDataBase');
var PlayerBattleBase = require('./base/PlayerBattleBase');
var tool = require('../util/tool');
var game = require('../game');
var _id = 0;

function Enemy(data) {
  this.data = new PlayerDataBase(data);
  this.battle = new PlayerBattleBase(this);
}

module.exports = Enemy;

Enemy.getByID = function (enemyID, callback) {
  var data = tool.copyData(game.publicData.enemys[enemyID]);
  data.id = getID();
  var _enemy = new Enemy(data);
  _enemy.id = data.id;

	return callback(null, _enemy);
}

function getID(){
  _id ++ ;
  return _id;
}
