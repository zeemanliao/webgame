/*
***********************************************************************************************
============================================角色元件===========================================
***********************************************************************************************
*/
var CharaClass = Object.Extend(BaseViewClass);

CharaClass.prototype.initialize=function(){
  this.v = {};
  this.base();
}
CharaClass.prototype.create=function(){
  var self = this;
  this.frame = $('#chara_frame');
  
  this.v.nam = this.gid('chara_nam');
  this.v.level = this.gid('chara_level');
  this.v.gold = this.gid('chara_gold');
  this.v.vipgold = this.gid('chara_vipgold');
  this.v.dmg = this.gid('chara_dmg');
  this.v.mag = this.gid('chara_mag');
  this.v.def = this.gid('chara_def');
  this.v.hp = this.gid('chara_hp');
  this.v.ex = this.gid('chara_ex');
  this.v.cex = this.gid('chara_cex');
  this.v.photo = this.gid('photo');
  
}

CharaClass.prototype.update=function(data){
  if (!data) return;


  if (!this.data) {
      this.data = data;
  }else{
      for (var item in data){
          this.data[item]=data[item];
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

}

