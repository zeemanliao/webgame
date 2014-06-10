var settings = require('../settings');
var pool = require('../db');
var tableName = 'chara';
var clone = require('../util/clone');
var util = require('../util/tool');
var Game = require('../game');

var id=0;
function Battle() {
  this.id = 0;
  this.map = {};
  this.pwd = null;
  this.members = {};
}

module.exports = Battle;


Battle.create = function (chara, map, pwd, callback) {
		if (chara.tmp.battle)
		return callback('您已在隊伍之中!');
	var tem = new Battle();
	tem.id = getID();
	
	tem.members = {};
	tem.members[chara.uid]=chara;
	tem.map = map;
	tem.pwd = pwd;
	chara.tmp.battle = tem;
	map.battles[tem.id] = tem;
	Game.emit();
	return callback(null, tem);
}

Battle.prototype.join = function (chara,pwd,callback){
	if (chara.tmp.battle)
		return callback('您已在其他隊伍之中!');
	
	if (this.members[chara.uid])
		return callback('您已在此隊伍之中!');

	if (this.pwd && this.pwd != pwd)
		return callback('隊伍密碼錯誤!');

	if (this.count() >= settings.game.battleMax)
		return callback('隊伍已滿，無法加入!');

	this.members[chara.uid] = chara;
	chara.tmp.battle = this;

	return callback();
}

Battle.prototype.count = function(){
	return Object.keys(this.members).length;
}
Battle.prototype.leave = function (chara,callback){
	if (this.members[chara.uid]){

		//退出socket.io room
		chara.socket.leave('battle_'+chara.tmp.battle.id);
		//移掉成員
		delete this.members[chara.uid];
		//移掉隊伍
		delete chara.tmp.battle;
		//如果隊伍沒人
		if (this.count()<1) {
			//移掉地圖上的隊伍
			Game.in('map_'+this.map.id,{battle:{removeBattle:this.id}});
			delete this.map.battles[this.id];
		} else {
			Game.in('map_'+this.map.id,{battle:{updateBattle:Game.coms.battle.parseReturnBattle(this)}});
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