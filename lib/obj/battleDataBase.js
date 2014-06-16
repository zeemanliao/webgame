var Game = require('../game');

var ThisBase = function(){
	this.bdata = {
		id:0,
		basetick:8,
		tick:8,
		hp:0,
		maxhp:0,
		nam:'',
		mag:0,
		dmg:0,
		def:0,
		level:1,
		cex:0,
		ex:0,
		act:'',
		photo:'',
		pos:0,
		target:{}
	};
};
ThisBase.prototype.battleData = function(){
	return {
		pos:this.bdata.pos,
		nam:this.bdata.nam,
		tick:this.bdata.tick,
		tickbase:this.bdata.tickbase,
		hp:this.bdata.hp,
		maxhp:this.bdata.maxhp,
		dmg:this.bdata.dmg,
		mag:this.bdata.mag,
		def:this.bdata.def,
		level:this.bdata.level,
		cex:this.bdata.cex,
		ex:this.bdata.ex,
		photo:this.bdata.photo,
		target:this.bdata.target
	};
}
ThisBase.prototype.battleInit = function(){
	this.bdata.id = this.data.uid ? this.data.id:this.data.id;
	this.bdata.hp = this.data.hp;
	this.bdata.maxhp = this.data.hp;
	this.bdata.nam = this.data.nam;
	this.bdata.dmg = this.data.dmg;
	this.bdata.mag = this.data.mag;
	this.bdata.def = this.data.def;
	this.bdata.photo = this.data.photo;
	this.bdata.cex = this.data.cex;
	this.bdata.ex = this.data.ex;
	this.bdata.level = this.data.level;
};

ThisBase.prototype.battleLeave = function(){
	Game.in('team_'+this.bdata.team.id,{battle:{removeMember:this.bdata.pos}});
	this.bdata.team.members.splice(this.bdata.pos);
	delete this.bdata.team;
	delete this.battle;
	
}
module.exports = ThisBase;