//content
var GameContent = $('#content');
//
var tool = {
	getAttr:function(item){
		var _restr='';
		var _data = {
			dmg:0,
			mag:0,
			def:0
		}
		for (var i in _data) {
			if (item[i])
				_restr += '<font color=green>' + lang[i] + '</font>:' + item[i] + '、';
		}
		if (_restr.length >0)
			_restr = _restr.substr(0, _restr.length-1);
		return _restr;
	},
  radioEvent:function(r){
  	this.childFunction(r.parent(),
    	function(_this){
      	_this.removeClass('selected');
    });
    r.addClass('selected');
	},
	selectEvent:function(r){
    this.childFunction(r.parent(),
    	function(_this){
      	_this.removeClass('selected');
    });
    r.addClass('selected');
	},
	isUndefinedOrNull:function(d){
		if (typeof d === 'undefined' || d == null)
			return true;
		return false;
	},

	isNumeric:function(val){
		if (this.isUndefinedOrNull(val) || val =='')
			return false;
		return !isNaN(val);
	},

	childFunction:function(parent, fun) {
		parent.children().each(
			function(index){
				fun($(this));
			});
	}
}
//時間顯示
var o_showTime = new TimeClass();
//本機資料庫
var publicData = new LocalStorageClass();

var items = {};
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
o.mix = new MixFrameClass();
o.cha = new ChaClass();
o.pet = new PetClass();
o.area = new AreaClass();
o.map = new MapClass();
o.shop = new ShopFrameClass();
o.battle = new BattleClass();
o.guest = new GuestClass();
o.team = new TeamClass();
o.enemy = new EnemyClass();
o.home = new HomeClass();
o.storage = new StorageFrameClass();
o.bag = new BagFrameClass();

