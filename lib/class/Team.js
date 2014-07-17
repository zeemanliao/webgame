
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
	if (tool.isUndefinedOrNull(data) || 
			tool.isUndefinedOrNull(data.limit) || 
			!tool.isNumeric(data.limit))
		return callback(new Game.GameWarning('E0023'));
	
	var _team = new Team();
	_team.id = getID();
	_team.limit = data.limit;
	_team.pwd = data.pwd;

	return callback(null, _team);
}

Team.prototype.leave = function(id) {
	delete this.members[id];
}

Team.prototype.clear = function(){
	for (var i in this.members) {
		this.members[i] = null;
		delete this.members[i];
	}
}

Team.prototype.join = function (member, pwd, callback){
	if (member.team)
		return callback(new Game.GameWarning('E0022'));

	if (this.pwd && this.pwd != pwd)
		return callback(new Game.GameWarning('E0024'));

	if (this.isFull())
		return callback(new Game.GameWarning('E0025'));

	this.add(member);

	return callback(null);
}

Team.prototype.add = function(member){
	member.team = this;

	member.data.pos = this.getPos();
	this.members[member.id] = member;
}

Team.prototype.getPos = function(){
	var d=[];
	for (var i in this.members){
		var c = this.members[i].data.pos;
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
		this.members[i].battle.tick -=1;
	}
}

Team.prototype.getTarget = function(){
	var rnd = tool.getRandom(1, this.count());
	var c = 0;
	for (var i in this.members){
		c++;
		if (c==rnd){
			return this.members[i];
		}
	}
	return null;
}

Team.prototype.getTeamData = function(){

	var tmp = {
		id:this.id,
		public:this.public
	};
	tmp.members = [];

	for (var j in this.members){
		var member = this.members[j];
		tmp.members.push(member.data.getTeam());
	}
	return tmp;
}

Team.prototype.count = function(){
	return Object.keys(this.members).length;
}

Team.prototype.isFull = function(){
	return this.count() >= this.limit;
}

Team.prototype.teamMembersXXXx=function(){
	var m = {};
	for (var i in this.members) {
		var member = this.members[i];
		m[member.id] = member.data.getTeam();
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