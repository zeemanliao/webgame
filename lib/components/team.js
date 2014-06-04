var util = require('../util/tool.js');
var Game = {};
var coms = {};
var Team = require('../obj/team.js');
var self = this;
this.load = function(data) {
	Game = data;
}
/*
	router 接收傳入的資料,分派到特定的function去執行
*/
this.on = function(chara,com2,data){
	if (!com2)
	return;

	if (!coms[com2])
		return;
	
	coms[com2](chara,data);
}

coms.list = function(chara,data) {
	var map_id = data;
	if (!map_id)
		return;

	var teams = self.list(map_id);

	var reteams = [];
	for (var i in teams){
		var team = teams[i];
		var tmp = {};
		tmp.id = team.id;
		tmp.members = [];
		//取得成員清單
		for (var j in team.members){
			var member = team.members[j];
			var tmp_m = {
				photo:member.data.photo,
				nam:member.data.nam,
				level:member.data.level,
				cex:member.data.cex
			};
			tmp.members.push(tmp_m);
		}
		reteams.push(tmp);
	}
	
	chara.redata.team = {map:data,list:reteams};
	chara.emit();
}

coms.create = function(chara,data){
	//錯誤的地圖代碼「$」!
	if (!util.check(data))
		return Game.show_message(chara,lang.err.E0013);
	var pwd = data.pwd ? data.pwd: '';
	var map_id = data.map;
	var map = Game.db.maps[map_id] ;
	if (!map)
		return Game.show_message(chara,lang.err.E0017,data);

	
	Team.create(chara,map,pwd,function(err,team){
		if (err)
			return Game.show_message(chara,err);

		return Game.show_message(chara,'已建立'+chara.tmp.team.id);
	});
}
/*
	取得特定地圖所有公開隊伍
 */
this.list = function(map_id) {
	if (!util.checkNum(map_id))
		return [];

	var map = Game.db.maps[map_id] ;
	if (!map)
		return [];

	var ret_team = [];
	for (var i in map.teams){
		var team = map.teams[i];
		//沒設密碼為公開
		if (team.pwd == '' && team.count()<Game.settings.game.teamMax) {
			ret_team.push(team);
		}
	}
	return ret_team;
}
/*
	加入隊伍
 */
this.join  = function (chara) {

}