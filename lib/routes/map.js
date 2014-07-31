var tool = require('../util/tool.js');

module.exports = {
	move:function(player, mapID, callback) {
		if (!tool.isNumeric(mapID))
			return callback(new this.game.Error('E0016', mapID));

		var self = this;
		var map = this.game.publicData.maps[mapID];

		if (tool.isUndefinedOrNull(map))
			return callback(new this.game.Error('E0016', mapID));
		
		if (player.data.level < map.level) 
			return callback(new this.game.Warning('E0015'));

		this.game.components.team.getTeamByMap(map, function(err, teamList){
			if (err)
				return callback(err);

			player.emit({team:{map:mapID, list:teamList}});
			
			self.game.routes.city.move(player, 'team', function(err){
				if (err)
					return callback(err);
				
				player.joinMap(map);

			});
		});
	}
}
