var util = require('../util/tool.js');
var coms = {};
var Team = require('../obj/team.js');
var Battle = require('../obj/battle.js');
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

coms.list = function(chara,map_id) {
	if (!map_id)
		return;
	var map = self.Game.db.maps[map_id];
	if (!map)
		return;

	var reteams = [];
	for (var i in map.teams){
		var team = map.teams[i];
		if (!team.isFull())
			reteams.push(team.clientData());
	}
	
	chara.redata.team = {map:map_id,list:reteams};
	chara.emit();
}

coms.create = function(chara,data){
	//錯誤的地圖代碼「$」!
	if (!util.check(data))
		return self.Game.show_message(chara,lang.err.E0013,data);
	if (chara.team)
		return self.Game.show_message(chara,'您已在隊伍之中!');
	var pwd = data.pwd ? data.pwd: '';
	var map_id = data.map;
	
	var map = self.Game.db.maps[map_id] ;
	var level = data.level;
	if (!map)
		return self.Game.show_message(chara,lang.err.E0017,data);
	var map_room = 'map_'+map_id;

	Team.create({
				pwd:pwd,
				limit:self.Game.settings.game.teamMax},
				function(err,team){
		if (err)
			return self.Game.show_message(chara,err);

		
	
		//chara.socket.leave(map_room);
		team.join(chara,pwd,function(err){
			if (err){
				team = null;
				return self.Game.show_message(chara,err);
			}

			map.teams[team.id] = team;
			team.map = map;
			Team.create({limit:8},function(err,team2){
				if (err)
					return self.Game.show_message(chara,err);
				Battle.create(team,team2,function(err,battle){
					if (err)
						return self.Game.show_message(chara,err);
					chara.redata.battle = {init:{
						team:team.clientData(),
						enemy:team.enemy.clientData()
					}};
					chara.emit();
					battle.start();
				});
			});
			self.Game.in(map_room,{team:{addTeam:team.clientData()}});
		});
		
		//team.battle.start();
		//return self.Game.show_message(chara,'已建立'+chara.tmp.team.id);
	});

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
			self.Game.in('map_'+team.map.id,{team:{updateTeam:team.clientData()}});
		}
		chara.redata.battle = {init:{
			team:team.clientData(),
			enemy:team.enemy.clientData()
		}};
		chara.emit();
		//return self.Game.show_message(chara,'加入'+chara.tmp.team.id);		
	});
}
