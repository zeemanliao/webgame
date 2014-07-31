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

}

