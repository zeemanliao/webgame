var tool = require('../util/tool.js');

module.exports = {
	move:function(player, data) {
		var buld = this.game.db.citys[data] ;

		if (tool.isUndefinedOrNull(buld))
			player.showMessage(player, lang.err('E0016'),data);

		player.move(data);
	}
}