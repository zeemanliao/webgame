var tool = require('../../util/tool');
var skill = require('../Skill');

function PlayerBattleBase(parent) {
	this.parent = parent;
	this.act = skill.atk;
	this.target = null;
	this.data = parent.data;
	this._basetick = 3;
	this._tick = this._basetick;
}

module.exports = PlayerBattleBase;

PlayerBattleBase.prototype.action = function() {
	if (tool.isUndefinedOrNull(this.atk))
		this.act = skill.atk;
	
	if (tool.isUndefinedOrNull(this.target))
		this.target = this.parent.team.enemy.getTarget();

	if (tool.isUndefinedOrNull(this.target))
		return;

	var self = this;

	this.act(this, function(err, data){
		console.log(self.parent.data.nam + '=>');
		console.log(data);
	});
}


/*
  @tick
 */
PlayerBattleBase.prototype.__defineGetter__("tick", function(){
  return this._tick;
});
    
PlayerBattleBase.prototype.__defineSetter__("tick", function(val){
  if (val < 1) {
    val = this._basetick;
    this.action();
  }
  this._tick = parseInt(val);
});

/*
  @basetick
 */
PlayerBattleBase.prototype.__defineGetter__("basetick", function(){
  return this._basetick;
});
    
PlayerBattleBase.prototype.__defineSetter__("basetick", function(val){
  this._basetick = parseInt(val);
});