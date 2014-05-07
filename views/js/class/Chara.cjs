/*
***********************************************************************************************
============================================角色元件===========================================
***********************************************************************************************
*/
var CharaClass = Object.Extend(BaseViewClass);

CharaClass.prototype.initialize=function(){
  this.base();
}
CharaClass.prototype.create=function(){
  var self = this;
  this.frame.className = 'cs_charaframe';
  
  var s_nam = this.createObj();
  s_nam.innerHTML='Name:';
  this.nam = this.createObj();

  var s_level = this.createObj();
  s_level.innerHTML=",Level:";
  this.level = this.createObj();

  var s_ex = this.createObj();
  s_ex.innerHTML = ",Ex:";
  this.ex = this.createObj();

  var s_hp = this.createObj();
  s_hp.innerHTML = ",Hp:";
  this.hp = this.createObj();

  var s_mag = this.createObj();
  s_mag.innerHTML = ",Mag:";
  this.mag = this.createObj();

  var s_dmg = this.createObj();
  s_dmg.innerHTML = ",Dmg:";
  this.dmg = this.createObj();

  var s_def = this.createObj();
  s_def.innerHTML = ",Def:";
  this.def = this.createObj();

  this.append(s_nam);
  this.append(this.nam);
  this.append(s_level);
  this.append(this.level);
  this.append(s_ex);
  this.append(this.ex);
  this.append(s_hp);
  this.append(this.hp);
  this.append(s_mag);
  this.append(this.mag);
  this.append(s_dmg);
  this.append(this.dmg);
  this.append(s_def);
  this.append(this.def);
  
  document.body.appendChild(this.frame);
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

