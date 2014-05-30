var util = require('../util/tool.js');
var Game = {};
var coms = {};

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

this.list = function(map_id) {
	if (!util.checkNum(map_id))
		return [];

	var map = Game.db.maps[map_id] ;

	var teams = map.teams;

	var ret_team = [];
	for (var i in teams){
		var team = team[i];
		//沒設密碼為公開
		if (team.pass == '') {
			ret_team.push(team);
		}
	}
	return ret_team;
}