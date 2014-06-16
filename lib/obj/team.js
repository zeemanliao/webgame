
var tool = require('../util/tool');
var Game = require('../game');
var Battle = require('./battle')
var settings = Game.settings;


var id=0;
function Team() {
  this.id = 0;
  this.pwd = '';
  this.members = [];
  this.limit = 0;	//members上限
}

module.exports = Team;

Team.create = function (data, callback) {
	if (!data || !data.limit || !tool.checkNum(data.limit)){
		return callback('錯誤的隊伍上限!');
	}
	
	
	var tem = new Team();
	tem.id = getID();
	tem.limit = data.limit;
	tem.pwd = data.pwd ? data.pwd:'';
	/*
	tem.initBattle(_chara);
	_chara.socket.join('team_'+tem.id);
	*/

	return callback(null, tem);
}

Team.prototype.join = function (member,pwd,callback){

	if (this.pwd && this.pwd != pwd)
		return callback('隊伍密碼錯誤!');

	if (this.count() >= this.limit)
		return callback('隊伍已滿，無法加入!');

	if (!this.push(member))
		return callback('隊伍加入失敗，無法加入隊!');

	member.team = this;

	Game.in('team_'+this.id,{battle:{addMember:member.battleData()}});
	if (member.socket)
		member.socket.join('team_'+this.id);
	return callback();
}

Team.prototype.push = function(member){
	for (var i =1;i<=this.limit;i++) {
		if (!this.members[i]){
			this.members[i]=member;
			member.bdata.pos = i;
			return true;
		}
	}
	return false;
}

Team.prototype.count = function(){
	return this.members.length;
}
Team.prototype.leave = function (chara,callback){
	if (this.members[chara.uid]){

		//退出socket.io team
		chara.socket.leave('team_'+this.id);
		//移掉成員
		delete this.members[chara.uid];
		//移掉隊伍
		delete chara.bdata.team;
		//如果隊伍沒人
		if (this.count()<1) {
			//移掉作戰資料
			this.battle.leave();
			//this.battle = null;
			//delete this.battle;
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
		var member = this.members[i];
		m[member.id] = member.clientData();
	}
	return m;
}

function getID(){
	id ++;
	return id;
}