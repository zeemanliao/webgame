
var util = require('../util/tool');
var Game = require('../game');
var settings = Game.settings;


var id=0;
function Team() {
  this.id = 0;
  this.map = {};
  this.pwd = null;
  this.members = {};
  this.level = 0;	//難度0:易,1:普,難:2
}

module.exports = Team;

Team.create = function (chara, map, pwd, level, callback) {
	if (chara.tmp.team)
		return callback('您已在隊伍之中!');

	var tem = new Team();
	tem.id = getID();

	tem.members = {};
	tem.members[chara.uid]=chara;
	chara.tmp.teampos = 1;
	tem.map = map;
	tem.pwd = pwd;
	chara.tmp.team = tem;
	map.teams[tem.id] = tem;
	tem.initBattle(chara);
	chara.socket.join('team_'+tem.id);
	Battle.create(tem,function(err,battle){
		if (err)
			return self.Game.show_message(chara,err);
		battle.level = level;
		tem.battle = battle;
	});
	return callback(null, tem);
}

Team.prototype.join = function (chara,pwd,callback){
	if (chara.tmp.team)
		return callback('您已在其他隊伍之中!');
	
	if (this.members[chara.uid])
		return callback('您已在此隊伍之中!');

	if (this.pwd && this.pwd != pwd)
		return callback('隊伍密碼錯誤!');

	if (this.count() >= settings.game.teamMax)
		return callback('隊伍已滿，無法加入!');

	
	this.members[chara.uid] = chara;
	chara.tmp.team = this;
	chara.tmp.teampos = this.getPos();
	this.initBattle(chara);
	//chara.socket.broadcast.emit('team_'+this.id,{battle:{addMember:parseMember(chara)}});
	Game.in('team_'+this.id,{battle:{addMember:parseMember(chara)}});
	chara.socket.join('team_'+this.id);
	return callback();
}

Team.prototype.getPos = function(){
	var re = [];
	for (var i in this.members) {
		var member = this.members[i];
		re[member.tmp.teampos] = true;

	}
	var i =1;
	for (i=1;i<=settings.game.teamMax;i++) {
		if (!re[i])
			return i;
	}
}

Team.prototype.count = function(){
	return Object.keys(this.members).length;
}
Team.prototype.leave = function (chara,callback){
	if (this.members[chara.uid]){

		//退出socket.io team
		chara.socket.leave('team_'+this.id);
		//移掉成員
		delete this.members[chara.uid];
		//移掉隊伍
		delete chara.tmp.team;
		//如果隊伍沒人
		if (this.count()<1) {
			//移掉地圖上的隊伍
			Game.in('map_'+this.map.id,{team:{removeTeam:this.id}});
			delete this.map.teams[this.id];
		} else {
			Game.in('map_'+this.map.id,{team:{updateTeam:Game.coms.team.parseReturnTeam(this)}});
		}
		chara.socket.leave('team_'+this.id);
		Game.in('team_'+this.id,{battle:{removeMember:chara.tmp.teampos}});
		delete chara.tmp.teampos;
		return callback ? callback():null;
	} else {
		return callback ? callback('您不在隊伍中!'):null;
	}
}
Team.prototype.initBattle=function(chara){
	var data ={
		team:this.teamInfo(),
		members:this.teamMembers()
	};
  if (chara.tmp.map)
    chara.socket.leave('map_'+chara.tmp.map.id);
	chara.socket.leave('map_');
	delete chara.tmp.map;
	chara.redata.battle = {init:data};
	chara.emit();
}

Team.prototype.teamInfo=function(){
	return {
		id:this.id,
		pwd:this.pwd
	};
}
Team.prototype.teamMembers=function(){
	var m = {};
	for (var i in this.members) {
		var member = parseMember(this.members[i]);
		m[member.uid] = member;
	}
	return m;
}
function parseMember(m) {
	var data = {
		pos:m.tmp.teampos,
		uid:m.data.uid,
		cex:m.data.cex,
		level:m.data.level,
		nam:m.data.nam,
		hp:m.data.hp,
		dmg:m.data.dmg,
		mag:m.data.mag,
		def:m.data.def,
		photo:m.data.photo
	};
	return data;
}
function getID(){
	id ++;
	return id;
}