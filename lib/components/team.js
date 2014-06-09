var util = require('../util/tool.js');
var coms = {};
var Team = require('../obj/team.js');
var self = this;
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
		reteams.push(self.parseReturnTeam(teams[i]));
	}
	
	chara.redata.team = {map:map_id,list:reteams};
	chara.emit();
}

/*
	取得回傳的隊伍資訊
 */
this.parseReturnTeam = function(team) {
	var tmp = {};
	tmp.id = team.id;
	tmp.public = team.pwd == '';
	tmp.members = [];
	//取得成員清單
	for (var j in team.members){
		var member = team.members[j];
		tmp.members.push(parseReturnMember(member));
	}
	return tmp;
}
/*
	取得成員資訊
 */
function parseReturnMember(member) {
	return {
			photo:member.data.photo,
			nam:member.data.nam,
			level:member.data.level,
			cex:member.data.cex
		};
}
coms.create = function(chara,data){
	//錯誤的地圖代碼「$」!
	if (!util.check(data))
		return self.Game.show_message(chara,lang.err.E0013);
	var pwd = data.pwd ? data.pwd: '';
	var map_id = data.map;
	var map = self.Game.db.maps[map_id] ;
	if (!map)
		return self.Game.show_message(chara,lang.err.E0017,data);

	
	Team.create(chara,map,pwd,function(err,team){
		if (err)
			return self.Game.show_message(chara,err);

		var map_room = 'map_'+team.map.id;

		chara.socket.leave(map_room);
		self.Game.in(map_room,{team:{addTeam:self.parseReturnTeam(team)}});
		
		//return self.Game.show_message(chara,'已建立'+chara.tmp.team.id);
	});
}
/*
	取得特定地圖所有公開隊伍
 */
this.list = function(map_id) {
	if (!util.checkNum(map_id))
		return [];

	var map = self.Game.db.maps[map_id] ;
	if (!map)
		return [];

	var ret_team = [];
	for (var i in map.teams){
		var team = map.teams[i];
		//沒設密碼為公開
		if (team.count()<self.Game.settings.game.teamMax) {
			ret_team.push(team);
		}
	}
	return ret_team;
}
/*
	加入隊伍
 */
coms.join  = function (chara,data) {
	//傳入參數不正確
	if (!data || !data.team)
		return self.Game.show_message(chara,lang.err.E0013);

	var team_id = data.team;
	var pwd = data.pwd ? data.pwd:'';
	//傳入參數不正確
	if (!util.checkNum(team_id))
		return self.Game.show_message(chara,lang.err.E0013);
	//請先選擇地圖
	if (!chara.tmp.map)
		return self.Game.show_message(chara,lang.err.E0018);
	var team = chara.tmp.map.teams[team_id];
	//找不到隊伍編號「$」!
	if (!team)
		return self.Game.show_message(chara,lang.err.E0019,team_id);
	team.join(chara,pwd,function(err){
		if (err)
			return self.Game.show_message(chara,err);

		if (team.count()>=self.Game.settings.game.teamMax){
			self.Game.in('map_'+team.map.id,{team:{removeTeam:team.id}});
		} else {
			self.Game.in('map_'+team.map.id,{team:{updateTeam:self.parseReturnTeam(team)}});
		}
		//return self.Game.show_message(chara,'加入'+chara.tmp.team.id);		
	});
}