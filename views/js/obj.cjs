//content
var GameContent = $('#content');
//
var gameTool = {
	getAttr:function(item){
		var _restr='';
		for (var i in item.base.data) {
			_restr += '<font color=green>' + lang[i] + '</font>:' + item.base.data[i] + '、';
		}
		if (_restr.length >0)
			_restr = _restr.substr(0, _restr.length-1);
		return _restr;
	},
  radioEvent:function(r){
    r.parent().find('radio').each(function(index){
      $(this).removeClass('selected');
    });
    r.addClass('selected');
	},
	selectEvent:function(s){
    s.parent().find('radio').each(function(index){
      $(this).removeClass('selected');
    });
    s.addClass('selected');
	}
}
//時間顯示
var o_showTime = new TimeClass();
//本機資料庫
var db = new LocalStorageClass();

var o = {};
//訊息視窗
o.message =  new MessageClass();
//輸入元件
o.input = new InputClass();
//角色元件
o.chara = new CharaClass();
//城鎮元件
o.city = new CityClass();
o.quest = new QuestClass();
o.act = new ActClass();
o.mix = new MixClass();
o.cha = new ChaClass();
o.pet = new PetClass();
o.area = new AreaClass();
o.map = new MapClass();
o.shop = new ShopClass();
o.battle = new BattleClass();
o.guest = new GuestClass();
o.team = new TeamClass();
o.enemy = new EnemyClass();
o.home = new HomeClass();
o.storage = new StorageFrameClass();
o.bag = new BagFrameClass();

