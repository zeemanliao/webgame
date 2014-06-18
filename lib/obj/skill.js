
module.exports = {
	atk:function(main,target){
		var dmg = main.bdata.dmg - target.bdata.def;
		if (main.socket){
		//	console.log(main.bdata);
		}		
		dmg = dmg < 1 ?1:dmg;
		if (dmg>target.bdata.hp) {
			dmg = target.bdata.hp;
		}

		target.bdata.hp-=dmg;
		return {
			dmg:dmg,
			nam:'普攻',
			msg:'攻擊'
		};
	}
}