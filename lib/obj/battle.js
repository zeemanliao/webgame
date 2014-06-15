
var util = require('../util/tool');
var Game = require('../game');
var Enemy = require('./enemy');
var settings = Game.settings;

var id=0;
function Battle(team) {
  this.team=team;
  this.map = team.map;
  this._level = 0;
  this.tickcount = 0;
  this.enemys={};
}

module.exports = Battle;
Battle.prototype.__defineGetter__("level", function(){
        return this._level;
    });
    
Battle.prototype.__defineSetter__("level", function(val){
	if (util.checkNum(val,0,settings.game.enemyLimit.length)) {
		this._level = val;
	} else {
		this._level = 1;
	}
	this.enemyMax = settings.game.enemyLimit[this._level];
});


Battle.create = function (team,callback) {
	var battle = new Battle(team);
	return callback(null,battle);
}
Battle.prototype.leave = function(){
	delete this.map;
	delete this.team;
	delete this.enemys;
	clearInterval(this.ticker);
}
Battle.prototype.start = function() {
	var self = this;
	
	this.ticker =  setInterval(
		//process.nextTick(
			function(){self.tick();}
		//)
		,1000);
}

Battle.prototype.tick = function() {
	var self = this;
	this.tickcount +=1;
	if (this.tickcount % 5 == 1){
		process.nextTick(
			function(){
				self.checkenemy();
			}
		);
	}
	for (var i in this.enemys) {
		var enemy = this.enemys[i];
		enemy.tick();
	}
}
/*
	是否產出敵人
*/
Battle.prototype.checkenemy = function(callback){
	var self = this;
	var _fenemy = this.enemyMax-this.enemyCount();
	
	
	if (_fenemy>0 
		&& _fenemy>=util.getRnd(this.enemyMax)){
		var _teamid = this.team.id;
		Enemy.create(_fenemy,function(err,_enemy){
			_enemy.data.pos = self.getPos();
			self.enemys[_enemy.id]=_enemy;
			Game.in('team_'+_teamid,{battle:{
				addEnemy:_enemy.parseEnemy()
			}});
		});
	}
	if (typeof callback === 'function')
		return callback();
}

Battle.prototype.getPos = function(){
  var re = [];
  for (var i in this.enemys) {
    var _enemy = this.enemys[i];
    re[_enemy.data.pos] = true;

  }
  var i =1;
  for (i=1;i<=this.enemyMax;i++) {
    if (!re[i])
      return i;
  }
}
Battle.prototype.attack = function(a,b){
	var dmg = ab.data.dmg;
	b.data.hp -=dmg;
	Game.in('team_'+this.team.id,{
		attack:{anam:a.nam,bnam:b.nam,dmg:dmg}
	});
}
Battle.prototype.enemyCount = function(){
	return Object.keys(this.enemys).length;
}