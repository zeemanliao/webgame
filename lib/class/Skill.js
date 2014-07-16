module.exports = {
	atk:function(main, callback){
		var target = main.target;
		var dmg = main.data.dmg - target.data.def;
		dmg = dmg>0?dmg:1;
		if (dmg>target.data.hp)
			dmg=target.data.hp;
		target.data.hp-=dmg;

		return callback(null,{
			nam:'普攻',
			msg:'攻擊',
			dmg:dmg
		});
	}
}