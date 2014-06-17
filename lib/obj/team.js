
var tool = require('../util/tool');
var Game = require('../game');
var Battle = require('./battle')
var settings = Game.settings;


var id=0;
function Team() {
  this.id = 0;
  this._pwd = '';
  this.members = {};
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
	tem.pwd = data.pwd;
	/*
	tem.initBattle(_chara);
	_chara.socket.join('team_'+tem.id);
	*/
	return callback(null, tem);
}

Team.prototype.join = function (member,pwd,callback){
	if (member.team)
		return callback('你已在隊伍中!');
	if (this.pwd && this.pwd != pwd)
		return callback('隊伍密碼錯誤!');

	if (this.isFull())
		return callback('隊伍已滿，無法加入!');
	member.battleInit();
	this.add(member);
	member.team = this;
	
	Game.in('team_'+this.id,{battle:{addMember:member.clientData()}});
	if (member.socket)
		member.socket.join('team_'+this.id);
	return callback();
}

Team.prototype.add = function(member){
	member.bdata.pos = this.getPos();

	this.members[member.bdata.id]=member;

}
Team.prototype.getPos = function(){
	var d=[];
	for (var i in this.members){
		var c = this.members[i].bdata.pos;
		d[c]=true;
	}
	for (var i=1;i<=d.length;i++){
		if (!d[i])
			return i;
	}
	return 1;
}
/*
	取得回傳的隊伍資訊
*/
Team.prototype.clientData = function(){

	var tmp = {
		id:this.id,
		public:this.public
	};
	tmp.members = [];
	//取得成員清單
	for (var j in this.members){
		var member = this.members[j];
		tmp.members.push(member.clientData());
	}
	return tmp;
}
Team.prototype.count = function(){
	return Object.keys(this.members).length;
}

Team.prototype.isFull = function(){
	return this.count()>=this.limit;
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
Team.prototype.__defineGetter__("pwd", function(){
    return this._pwd;
});

Team.prototype.__defineSetter__("pwd", function(val){
	this._pwd = val ? val:'';
	this.public = val =='';
});
function getID(){
	id ++;
	return id;
}