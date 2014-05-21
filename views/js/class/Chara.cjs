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
  
  this.v.nam = this.gid('nam');
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

      var dta = this.data[i];
      
      if (this.v[i])
        this.v[i].html(dta);
    }
    
    this.v.gold.html(this.data.gold + ' G');
}

