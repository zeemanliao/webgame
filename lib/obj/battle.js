
var tool = require('../util/tool');
var Game = require('../game');
var Enemy = require('./enemy');
var settings = Game.settings;

var id=0;
function Battle() {
  this.tickcount = 0;
}
module.exports = Battle;

Battle.create = function (team1,team2,callback) {
	var battle = new Battle();
	battle.team1 = team1;
	battle.team2 = team2;
	battle.team1.battle = battle;
	battle.team2.battle = battle;
	battle.team1.enemy = team2;
	battle.team2.enemy = team1;
	return callback(null,battle);
}
Battle.prototype.leave = function(){
	this.team1.battle = null;
	this.team1 = null;
	this.team2 = null;
	delete this.team1;
	delete this.team2;
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
	if (this.team1.count()<1){
		return this.leave();
	}
	var self = this;
	this.tickcount +=1;
	if (this.tickcount % 5 == 1){
		process.nextTick(
			function(){
				self.checkenemy(self.team2);
			}
		);
	}
	this.team1.tick();
	this.team2.tick();
}
/*
	是否產出敵人
*/
Battle.prototype.checkenemy = function(team,callback){
	if (team.isFull())
		return;
	var self = this;
	var _fenemy = team.limit-team.count();

	
	if (_fenemy>0 
		&& _fenemy>=tool.getRnd(team.limit)){
		Enemy.create(_fenemy,function(err,_enemy){
			team.add(_enemy);
			
			Game.in('team_'+self.team1.id,{battle:{
				addEnemy:_enemy.clientData()
			}});
			Game.in('team_'+self.team2.id,{battle:{
				addEnemy:_enemy.clientData()
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
