var tool = require('../util/tool.js');

module.exports = {
	move:function(player, mapID) {
		var map = this.game.db.maps[mapID];

		if (!map)
			return player.showMessage(lang.err('E0016'), mapID);
		
		if (player.data.level < map.level) 
			return player.showMessage(player,lang.err('E0015'));				

		this.game.routes.team.list(player,data);

		player.move('team',function(){
			player.tmp.map = map;

			player.socket.join('map_'+map.id);
		});
	}
}
