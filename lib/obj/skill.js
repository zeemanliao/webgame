module.exports = {
	atk:function(main,callback){
		var target = main.bdata.target;
		var dmg = main.bdata.dmg - target.bdata.def;
		dmg = dmg>0?dmg:1;
		if (dmg>target.bdata.hp)
			dmg=target.bdata.hp;
		target.bdata.hp-=dmg;

		return callback(null,{
			nam:'普攻',
			msg:'攻擊',
			dmg:dmg
		});
	}
}