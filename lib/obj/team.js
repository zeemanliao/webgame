var settings = require('../settings');
var pool = require('../db');
var tableName = 'chara';
var clone = require('../util/clone');
var util = require('../util/tool');

var id=0;
function Team() {
  this.id = 0;
  this.map = {};
  this.pwd = null;
  this.members = {};
}

module.exports = Team;


Team.create = function (chara, map, pwd, callback) {
	if (chara.tmp.team)
		return callback('您已在其他隊伍之中!');
	var tem = new Team();
	tem.id = getID();
	
	tem.members = {};
	tem.members[chara.uid]=chara;
	tem.map = map;
	tem.pwd = pwd;
	chara.tmp.team = tem;
	map.teams[tem.id] = tem;
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

	return callback();
}

Team.prototype.count = function(){
	return Object.keys(this.members).length;
}
Team.prototype.out = function (chara,callback){
	if (this.members[chara.uid]){
		//移掉成員
		delete this.members[chara.uid];
		//移掉隊伍
		delete chara.tmp.team;
		//如果隊伍沒人
		if (this.count()<1) {
			//移掉地圖上的隊伍
			delete this.map.teams[this.id];
			//移掉
		}
		return callback ? callback():null;
	} else {
		return callback ? callback('您不在隊伍中!'):null;
	}
}


function getID(){
	id ++;
	return id;
}