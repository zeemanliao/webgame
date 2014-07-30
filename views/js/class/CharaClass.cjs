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
  
  this.v.nam = this.gid('nam');
  this.v.level = this.gid('level');
  this.v.gold = this.gid('gold');
  this.v.vipgold = this.gid('vipgold');
  this.v.dmg = this.gid('dmg');
  this.v.mag = this.gid('mag');
  this.v.def = this.gid('def');
  this.v.hp = this.gid('hp');
  this.v.ex = this.gid('ex');
  this.v.freecex = this.gid('freecex');
  this.v.retime = this.gid('retime');
  this.v.cex = this.gid('cex');
  this.v.photo = this.gid('photo');
  
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

  this.showInfo();
}

CharaClass.prototype.showInfo = function() {
  var rc = new html5jp.graph.radar("radar");
  if( ! rc ) { return; }
  var items = [
    ["", this.data.str, this.data.int, this.data.mag, this.data.dex, this.data.vit]
  ];
  var params = {
    aCap: ["力", "智", "魔", "敏", "體"]
  }
  rc.draw(items, params);
}