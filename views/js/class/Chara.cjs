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
  this.frame = $('chara_frame');
  
  this.v.name = this.gid('name');
  this.v.level = this.gid('level');
  this.v.gold = this.gid('gold');
  this.v.vip = this.gid('vip');
  this.v.dmg = this.gid('dmg');
  this.v.mag = this.gid('mag');
  this.v.def = this.gid('def');
  this.v.hp = this.gid('hp');
  this.v.ex = this.gid('ex');
  this.v.cex = this.gid('cex');
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
      put(this[i],this.data[i]);
    }
/*

  this.nam.innerHTML=data.nam;
  this.level.innerHTML=data.level;
  this.ex.innerHTML=data.ex;
  this.hp.innerHTML=data.hp;
  this.mag.innerHTML=data.mag;
  this.dmg.innerHTML=data.dmg;
  this.def.innerHTML=data.def;
  */
}

