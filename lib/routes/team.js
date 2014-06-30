var tool = require('../util/tool.js');
var Team = require('../obj/team.js');
var Battle = require('../obj/battle.js');

module.exports = {
	list:function(player, mapID) {
		var map = player.db.maps[mapID];
		if (!map)
			return player.showMessage(game.lang.err('E0016'), mapID);

		var reteams = [];
		for (var i in map.teams){
			var team = map.teams[i];
			if (!team.isFull())
				reteams.push(team.clientData());
		}
		
		player.redata.team = {map:map_id,list:reteams};
		player.emit();
	},

	create:function(player,data){
		if (player.team)
			return player.showMessage('您已在隊伍之中!');
		var pwd = data.pwd ? data.pwd: '';
		var map_id = data.map;
		
		var map = this.game.db.maps[map_id] ;
		var level = data.level;
		if (!map)
			return player.showMessage(lang.err('E0017'),data);
		var map_room = 'map_'+map_id;

		Team.create({
					pwd:pwd,
					limit:this.game.settings.game.teamMax},
					function(err,team){
			if (err)
				return player.showMessage(err);

			
		
			//player.socket.leave(map_room);
			team.join(player, pwd, function(err){
				if (err){
					team = null;
					return player.showMessage(player,err);
				}

				map.teams[team.id] = team;
				team.map = map;
				Team.create({limit:8},function(err,team2){
					if (err)
						return player.showMessage(player,err);
					Battle.create(team,team2,function(err,battle){
						if (err)
							return player.showMessage(player,err);
						player.redata.battle = {init:{
							team:team.clientData(),
							enemy:team.enemy.clientData()
						}};
						player.emit();
						battle.start();
					});
				});
				player.in(map_room,{team:{addTeam:team.clientData()}});
			});
			
			//team.battle.start();
			//return player.showMessage(player,'已建立'+player.tmp.team.id);
		});
	}
}



/*
	加入隊伍
 */
coms.join  = function (player,data) {
	//傳入參數不正確
	if (!data || !data.team)
		return player.showMessage(player,lang.err.E0013);

	var team_id = data.team;
	var pwd = data.pwd ? data.pwd:'';
	//傳入參數不正確
	if (!util.checkNum(team_id))
		return player.showMessage(player,lang.err.E0013);
	//請先選擇地圖
	if (!player.tmp.map)
		return player.showMessage(player,lang.err.E0018);
	var team = player.tmp.map.teams[team_id];
	//找不到隊伍編號「$」!
	if (!team)
		return player.showMessage(player,lang.err.E0019,team_id);
	team.join(player,pwd,function(err){
		if (err)
			return player.showMessage(player,err);

		if (team.count()>=player.settings.game.teamMax){
			player.in('map_'+team.map.id,{team:{removeTeam:team.id}});
		} else {
			player.in('map_'+team.map.id,{team:{updateTeam:team.clientData()}});
		}
		player.redata.battle = {init:{
			team:team.clientData(),
			enemy:team.enemy.clientData()
		}};
		player.emit();
		//return player.showMessage(player,'加入'+player.tmp.team.id);		
	});
}
