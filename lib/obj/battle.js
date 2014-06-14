var settings = require('../settings');
var pool = require('../db');
var tableName = 'chara';
var clone = require('../util/clone');
var util = require('../util/tool');
var Game = require('../game');

var id=0;
function Battle(team) {
  this.team=team;
  this.map = team.map;
}

module.exports = Battle;


Battle.create = function (team,callback) {
	var battle = new Battle(team);
	return callback(null,battle);
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
	
	process.nextTick(
		function(){
			self.checkenemy();
		}
		);
	
}

Battle.prototype.checkenemy = function(callback){
	Game.in('team_'+this.team.id,{debug:{test:'checkenemy'}});
	if (typeof callback === 'function')
		return callback();
}