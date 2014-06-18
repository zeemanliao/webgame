
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
	tem.limit = data.limit?data.limit:5;
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
	
	
	Game.in('team_'+this.id,{battle:{addMember:member.clientData()}});
	if (member.socket)
		member.socket.join('team_'+this.id);
	return callback();
}

Team.prototype.add = function(member){
	member.team = this;

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
Team.prototype.tick = function(){
	for (var i in this.members){
		this.members[i].tick -=1;
	}
}
Team.prototype.getTarget = function(){
	var rnd = tool.getRnd(this.count());
	var c = 0;
	for (var i in this.members){
		c++;
		if (c==rnd){
			return this.members[i];
		}
	}
	return null;
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