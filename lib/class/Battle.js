var tool = require('../util/tool');
var Enemy = require('./Enemy');
var game = require('../game');
var id=0;
function Battle() {
  this.tickcount = 0;
}
module.exports = Battle;

Battle.create = function (map, team1, team2) {
	var battle = new Battle();
	battle.map = map;
	battle.team1 = team1;
	battle.team2 = team2;
	battle.team1.enemy = team2;
	battle.team2.enemy = team1;
	return battle;
}

Battle.prototype.leave = function(){
	clearInterval(this.ticker);
	delete this.map.teams[this.team1.id];
	this.team1.battle = null;
	this.team2.clear();
	this.team1 = null;
	this.team2 = null;


	delete this.team1;
	delete this.team2;
}

Battle.prototype.start = function() {
	var self = this;

	this.ticker =  setInterval(
			function(){self.tick();}
		,1000);
}

Battle.prototype.tick = function() {
	if (this.team1.count()<1)
		return this.leave();
	
	try {
		var self = this;
		this.tickcount +=1;
		if (this.tickcount % 5 == 1){
			process.nextTick(
				function(){
					self.makeEnemy(self.team2);
				}
			);
		}
		this.team1.tick();
		this.team2.tick();

	} catch(e) {
		game.inError('team_'+self.team1.id, e);
		this.leave();
	}
}

Battle.prototype.emit = function(data) {
	game.in('team_'+this.team1.id,data);
	game.in('team_'+this.team2.id,data);
}

Battle.prototype.makeEnemy = function(team, callback){
	if (team.isFull())
		return;

	try {

		var self = this;
		var _fenemy = team.limit - team.count();

		if (_fenemy>0 
			&& _fenemy >= tool.getRandom(1, team.limit)){

			Enemy.getByID(this.getNewEnemyID(), function(err, _enemy){
				team.add(_enemy);
				
				self.emit({battle:{
					addEnemy:_enemy.data.getBattle()
				}});
				
			});
		}
		
	} catch(e) {
		game.inError('team_'+self.team1.id,e);
		this.leave();
	}
	if (typeof callback === 'function')
			return callback();
}

Battle.prototype.getNewEnemyID = function(){
	var _max = this.map.enemys.length - 1;

	return this.map.enemys[tool.getRandom(0, _max)];
}

Battle.prototype.attack = function(a, b){
	var dmg = ab.data.dmg;
	b.data.hp -=dmg;
	game.in('team_'+this.team.id,{
		attack:{anam:a.nam,bnam:b.nam,dmg:dmg}
	});
}
