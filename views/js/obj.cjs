//時間顯示
var o_showTime = new TimeClass();
//本機資料庫
var db = new LocalStorageClass();

//建立隱藏存放物件
var hideframe = new $('hiddenframe');

var o = {};
//訊息視窗
o.message =  new MessageClass();
//角色元件
o.chara = new CharaClass();
//城鎮元件
o.city = new CityClass();
o.quest = new QuestClass();
o.act = new ActClass();
o.mix = new MixClass();
o.cha = new ChaClass();
o.pet = new PetClass();
o.map = new MapClass();
o.shop = new ShopClass();

o.city.show();