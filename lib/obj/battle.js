
var util = require('../util/tool');
var Game = require('../game');
var settings = Game.settings;

var id=0;
function Battle(team) {
  this.team=team;
  this.map = team.map;
  this._level = 0;
  this.enemys={};
}

module.exports = Battle;
Battle.prototype.__defineGetter__("level", function(){
        return this._level;
    });
    
Battle.prototype.__defineSetter__("level", function(val){
	if (util.checkNum(val,0,settings.game.enemyLimit.length())) {
		this._level = val;
	} else {
		this._level = val;
	}
	this.enemyMax = settings.game.enemyLimit[this._level];
});


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
	var fenemy = this.enemyMax-this.enemyCount();
	if (fenemy>0){
		
	}
	if (typeof callback === 'function')
		return callback();
}

Battle.prototype.enemyCount = function(){
	return Object.keys(this.enemys).length;
}