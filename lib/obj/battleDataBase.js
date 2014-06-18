var Game = require('../game');
var tool = require('../util/tool');

var ThisBase = function(){
	this.reset();
};
module.exports = ThisBase;
ThisBase.prototype.reset = function(){
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
		pos:0
	};
}
ThisBase.prototype.clientData = function(){
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
		totalDmg:this.bdata.totalDmg
	};
}
ThisBase.prototype.battleInit = function(){
	this.bdata.id = this.data.uid ? this.data.uid:this.data.id;
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
	this.bdata.totalDmg = 0;
};

ThisBase.prototype.leave = function(){
	if (this.team) {
		//離開隊頻
		if (this.socket)
			this.socket.leave('team_'+this.team.id);
		
		//移掉自己
		delete this.team.members[this.bdata.id];
		//如果此隊已全隊員
		if (this.team.map && this.team.count()<1){
			//移掉map上的team節點
			delete this.team.map.teams[this.team.id];
			//傳送移除隊伍訊息
			Game.in('map_'+this.team.map.id,{team:{removeTeam:this.team.id}});
		} else {
			//傳送離開訊息
			Game.in('team_'+this.team.id,{battle:{removeMember:this.bdata.pos}});
			Game.in('map_'+this.team.map.id,{team:{updateTeam:this.team.clientData()}});
		}
		//刪除team節點
		delete this.team;
	}
}
//動作
ThisBase.prototype.action=function(){
	if (!this.bdata.target){
		this.bdata.target = this.team.enemy.getTarget();
	}
	if (this.bdata.target){
		//Game.log(this.bdata.target);
		if (!this.bdata.act){
			this.bdata.act = Game.skill.atk;
		}
		var inf = this.bdata.act(this,this.bdata.target);
		var testmsg = inf.nam+':'+this.bdata.nam +
									'「'+inf.msg+'」'+
									this.bdata.target.bdata.nam+
									' 造成「'+inf.dmg+'」傷害!';
		console.log(testmsg);
		//Game.in('team_'+this.team.id,{battle:{test:testmsg}})
	}
}

ThisBase.prototype.__defineGetter__("tick", function(){
    return this.bdata.tick;
});

ThisBase.prototype.__defineSetter__("tick", function(val){
	this.bdata.tick = val;
	if (this.bdata.tick<=0){
		this.bdata.tick = this.bdata.basetick;
		this.action();
	}
});
