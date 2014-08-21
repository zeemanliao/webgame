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
  this.info_button_frame = this.frame.find('#info_button_frame');
  this.v.nam = this.gid('nam');
  this.v.level = this.gid('level');
  this.v.gold = this.gid('gold');
  this.v.vipgold = this.gid('vipgold');
  this.v.hp = this.gid('hp');
  this.v.maxhp = this.gid('maxhp');
  this.v.mp = this.gid('mp');
  this.v.maxmp = this.gid('maxmp');
  this.v.str = this.gid('str');
  this.v.int = this.gid('int');
  this.v.ski = this.gid('ski');
  this.v.dex = this.gid('dex');
  this.v.con = this.gid('con');
  this.v.freecex = this.gid('freecex');
  this.v.retime = this.gid('retime');
  this.v.cex = this.gid('cex');
  this.v.photo = this.gid('photo');
  this.v.dmg = this.gid('dmg');
  this.v.mag = this.gid('mag');
  this.v.def = this.gid('def');
  this.v.stone = {
    lv1:this.gid('lv1'),
    lv2:this.gid('lv2'),
    lv3:this.gid('lv3'),
    lv4:this.gid('lv4'),
    lv5:this.gid('lv5'),
    lv6:this.gid('lv6')
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
  for (var i in stones) {
    this.v.stone[i].html(stones[i]);
  }
}