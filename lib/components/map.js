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

/*
	地圖移動
*/
coms.move = function(chara,data){
	
	if (!util.checkNum(data))
		return;

	var buld = Game.db.citys[data] ;

	var map = Game.db.maps[data];

	if (map) {
		if (chara.data.level >= map.level) {
			chara.tmp.map = map;
			Game.coms.team.on(chara,'list',data);
			

			chara.move('team',function(){
				Game.log('Join = >' + map.id);
				chara.socket.join('map_'+map.id);
			});
		} else {
			//等級不足
			Game.show_message(chara,lang.err.E0015);
		}
	}

};

