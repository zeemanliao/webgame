var tool = require('../util/tool.js');
var Team = require('../class/Team.js');
var Battle = require('../class/Battle.js');

module.exports = {
	create:function(player, data, callback){
		if (player.team)
			return callback(new this.game.GameWarning('E0022'));

		var _pwd = data.pwd ? data.pwd : '';
		var _mapID = data.map;
		var _map = this.game.publicData.maps[_mapID] ;
		
		if (tool.isUndefinedOrNull(_map))
			return callback(new this.game.GameWarning('E0017'));

		var _mapRoom = 'map_' + _mapID;

		Team.create({
					pwd:_pwd,
					limit:this.game.settings.game.teamLimit},
					function(err, team){
			if (err)
				return callback(err);
		
			team.join(player, _pwd, function(err){
				if (err){
					team = null;
					return callback(err);
				}

				_map.teams[team.id] = team;
				team.map = _map;

				Team.create({limit:this.game.settings.game.emenyLimit[0]},function(err,team2){
					if (err)
						return callback(err);

					Battle.create(team,team2);

						player.emit({battle:{init:{
							team:team.clientData(),
							enemy:team.enemy.clientData()
						}}});
						team.battle.start();
					
				});
				
				player.in(_mapRoom,{team:{addTeam:team.clientData()}});
			});
			
			//team.battle.start();
			//return player.showMessage(player,'已建立'+player.tmp.team.id);
		});
	},

	join:function (player,data) {
		//傳入參數不正確
		if (!data || !data.team)
			return player.showMessage(player,lang.err.E0013);

		var team_id = data.team;
		var pwd = data.pwd ? data.pwd:'';
		//傳入參數不正確
		if (!tool.isNumeric(team_id))
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

}



/*
	加入隊伍
 */
