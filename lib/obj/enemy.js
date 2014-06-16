
var tool = require('../util/tool');
var Game = require('../game');
var settings = Game.settings;
var util = require('util');
var Base = require('./battleDataBase');
var _id=0;
function Enemy() {
  Base.call(this);
  this.id = 0;
  this.data = {
  	nam:'',
  	hp:99999,
  	dmg:0,
  	mag:0,
  	def:99999,
  	skill:0,
    pos:0,
    photo:''
  };
  
}

module.exports = Enemy;

Enemy.create = function (data, callback) {
  var _enemy = new Enemy();
  
  _enemy.id = getID();
  _enemy.data.nam = '怪'+data;
  _enemy.data.hp = tool.getRnd(100,300);
  _enemy.data.maxhp = _enemy.bdata.hp;
  _enemy.data.dmg = tool.getRnd(10,40);
  _enemy.data.mag = tool.getRnd(10,40);
  _enemy.data.def = tool.getRnd(10,40);
  _enemy.battleInit();
  
	return callback(null, _enemy);
}
util.inherits(Enemy, Base);
function getID(){
  _id ++ ;
  return _id;
}
