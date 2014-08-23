/*
***********************************************************************************************
============================================角色元件===========================================
***********************************************************************************************
*/
var CharaClass = Object.Extend(BaseViewClass);

CharaClass.prototype.initialize=function(){
  this.v = {};
  this.data = {};
  this.base();
}
CharaClass.prototype.create=function(){
  var self = this;
  this.frame = $('#chara_frame');
  this.main = this.frame.find('#main');

  this.info_button_frame = this.frame.find('#info_button_frame');
  this.info_base = this.frame.find('#info_base');
  this.info_battle = this.frame.find('#info_battle');
  this.info_stone = this.frame.find('#info_stone');

  this.v.nam = this.main.find('[gid=nam]');
  this.v.level = this.main.find('[gid=level]');
  this.v.gold = this.main.find('[gid=gold]');
  this.v.vipgold = this.main.find('[gid=vipgold]');
  this.v.retime = this.main.find('[gid=retime]');
  this.v.photo = this.main.find('[gid=photo]');
  
  this.v.str = this.info_base.find('[gid=str]');
  this.v.int = this.info_base.find('[gid=int]');
  this.v.ski = this.info_base.find('[gid=ski]');
  this.v.dex = this.info_base.find('[gid=dex]');
  this.v.con = this.info_base.find('[gid=con]');
  this.v.freecex = this.gid('freecex');
  
  this.v.cex = this.gid('cex');
  
  this.v.hp = this.info_battle.find('[gid=hp]');
  this.v.maxhp = this.info_battle.find('[gid=maxhp]');
  this.v.mp = this.info_battle.find('[gid=mp]');
  this.v.maxmp = this.info_battle.find('[gid=maxmp]');
  this.v.dmg = this.info_battle.find('[gid=dmg]');
  this.v.mag = this.info_battle.find('[gid=mag]');
  this.v.def = this.info_battle.find('[gid=def]');

  this.v.stone = {
    1:this.gid('lv1'),
    2:this.gid('lv2'),
    3:this.gid('lv3'),
    4:this.gid('lv4'),
    5:this.gid('lv5'),
    6:this.gid('lv6')
  }
  
  tool.selectEvent(this.frame.find('[data=info_base]'));
  this.info_button_frame.on('click', 'radio', 
    function(event){
        tool.selectEvent($(this));
        tool.childFunction($(this).parent(),
          function(_this){
            self.frame.find('#'+_this.attr('data')).hide();
          });
        self.frame.find('#'+$(this).attr('data')).show();
    });
}

CharaClass.prototype.update=function(data){
  if (!data) return;

  if (!this.data) {
      this.data = data;
  }else{
      for (var i in data){
          this.data[i]=data[i];
      }
  }
  for (var i in this.data){

    var dta = this.data[i];
    
    if (this.v[i] && this.v[i] != this.v.photo)
      this.v[i].html(dta);
  }
  if (data.photo)
    this.v.photo.attr('src',this.data.photo);
  if (data.gold)
    this.v.gold.html(this.data.gold + ' G');

  o.storage.bag[settings.storageType.bag].limit = this.data.bag;
  o.storage.bag[settings.storageType.storage].limit = this.data.storage;
  o.bag.bag[settings.storageType.bag].limit = this.data.bag;

  this.reflushBattleData();
}

CharaClass.prototype.reflushBattleData = function() {
  try {
    var _data = o.bag.bag[settings.storageType.equipment].data;
    this.v.dmg.html(parseInt(_data.dmg * (1+(this.data.level * this.data.str)/100)));
    this.v.mag.html(parseInt(_data.mag * (1+(this.data.level * this.data.ski)/100)));
    this.v.def.html(parseInt(_data.def * (1+(this.data.level * this.data.dex)/100)));
  } catch (e) {}
}

CharaClass.prototype.updateStone = function(stones) {
  this.stone = stones;
  for (var i in stones) {
    this.v.stone[i].html(stones[i]);
  }
}