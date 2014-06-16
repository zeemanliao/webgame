
var tool = require('../util/tool');
var Game = require('../game');
var settings = Game.settings;

var _id=0;
function Enemy() {
  this.id = 0;
  this.bdata = {
  	nam:'',
  	hp:99999,
  	dmg:0,
  	mag:0,
  	def:99999,
  	skill:0,
    pos:0,
    basetick:10
  };
  
}

module.exports = Enemy;

Enemy.create = function (data, callback) {
  var _enemy = new Enemy();
  _enemy.id = getID();
  _enemy.bdata.nam = '怪'+data;
  _enemy.bdata.hp = tool.getRnd(100,300);
  _enemy.bdata.maxhp = _enemy.bdata.hp;
  _enemy.bdata.dmg = tool.getRnd(10,40);
  _enemy.bdata.mag = tool.getRnd(10,40);
  _enemy.bdata.def = tool.getRnd(10,40);
  _enemy.bdata.tick = _enemy.bdata.basetick;
  
	return callback(null, _enemy);
}

Enemy.prototype.tick = function() {
  this.bdata.tick -=1;
  Game.log(this.bdata.basetick);
}

Enemy.prototype.parseEnemy=function(){
  return {
    id:this.id,
    nam:this.bdata.nam,
    pos:this.bdata.pos,
    hp:this.bdata.hp,
    maxhp:this.bdata.maxhp,
    dmg:this.bdata.dmg,
    mag:this.bdata.mag,
    def:this.bdata.def
  };
}

function getID(){
  _id ++ ;
  return _id;
}
