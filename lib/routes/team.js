var tool = require('../util/tool.js');
var Team = require('../class/Team.js');
var Battle = require('../class/Battle.js');

module.exports = {
	create:function(player, data, callback){
		if (player.team)
			return callback(new this.game.GameWarning('E0022'));

		var self = this;
		var _pwd = data.pwd ? data.pwd : '';
		var _mapID = data.map;
		var _map = this.game.publicData.maps[_mapID] ;
		
		if (tool.isUndefinedOrNull(_map))
			return callback(new this.game.GameWarning('E0017'));

		var _mapRoom = 'map_' + _mapID;

		Team.create({pwd:_pwd, limit:this.game.settings.game.teamLimit},
					function(err, team){
			if (err)
				return callback(err);
		
			Team.create({limit:self.game.settings.game.enemyLimit[0]},function(err, team2){
				if (err) 
					return callback(err);

				var _battle = Battle.create(_map, team, team2);
				_map.teams[team.id] = team;

				self.join(player, {team:team.id, pwd:_pwd}, function(err){
					if (err)
						return callback(err);

					_battle.start();
				});
				
			
			});
		});
	},

	join:function (player, data, callback) {
		var team_id = data.team;
		var pwd = data.pwd ? data.pwd:'';
		var self = this;

		if (!tool.isNumeric(team_id))
			return callback(new this.game.GameWarning('E0013'));

		if (tool.isUndefinedOrNull(player.map))
			return callback(new this.game.GameWarning('E0018'));

		var _team = player.map.teams[team_id];

		if (tool.isUndefinedOrNull(_team))
			return callback(new this.game.GameWarning('E0019'));

		_team.join(player, pwd, function(err){
			if (err)
				return callback(err);

			if (_team.isFull()){
				self.game.in('map_'+player.map.id, {team:{removeTeam:_team.id}});
			} else {
				self.game.in('map_'+player.map.id, {team:{updateTeam:_team.getTeamData()}});
			}
			player.leaveMap();
			
			player.joinTeam(_team);
			
			player.emit({battle:{init:{
				team:_team.getTeamData(),
				enemy:_team.enemy.getTeamData()
			}}});
			self.game.in('team_'+_team.id,{battle:{addMember:player.getBattleData()}});
			callback(null);
		});
	}
}