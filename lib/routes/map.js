var tool = require('../util/tool.js');

module.exports = {
	move:function(player, mapID, callback) {
		if (!tool.isNumeric(mapID))
			return callback(new this.game.Error('E0016'));

		var map = this.game.publicData.maps[mapID];

		if (tool.isUndefinedOrNull(map))
			return callback(new this.game.Error('E0016'));
		
		if (player.data.level < map.level) 
			return callback(new this.game.Warning('E0015'));

		this.game.components.team.getTeamByMap(map, function(err, teamList){
			if (err)
				return callback(err);

			player.emit({team:{map:mapID, list:teamList},
									city:{move:'team'}});
			player.move('team');
			player.joinMapRoom(map.id);
			
		});
	}
}
