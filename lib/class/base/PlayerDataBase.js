var tool = require('../../util/tool');

function PlayerDataBase(data) {
   this.data = data;
}

module.exports = PlayerDataBase;

PlayerDataBase.prototype.getBattle = function() {
  return {
    pos: this.pos,
    nam: this.nam,
    tick: this.tick,
    tickbase: this.tickbase,
    hp: this.hp,
    maxhp: this.maxhp,
    dmg: this.dmg,
    def: this.def,
    level: this.level,
    cex: this.cex,
    ex: this.ex,
    photo: this.photo
  };
}

PlayerDataBase.prototype.getInfo = function() {
  return {
    nam: this.nam,
    gold: this.gold,
    vipgold: this.vipgold,
    level: this.level,
    ex: this.ex,
    cex: this.cex,
    bag: this.bag,
    storage: this.storage,
    hp: this.hp,
    dmg: this.dmg,
    mag: this.mag,
    def: this.def,
    photo: this.photo,
    freecex: this.freecex,
    retime: this.retime
  };
}

PlayerDataBase.prototype.getGuest = function() {
  return {
    nam: this.nam,
    level: this.level,
    ex: this.ex,
    cex: this.cex,
    retime: this.retime
  };
}

PlayerDataBase.prototype.getTeam = function() {
  return {
    pos: this.pos,
    nam: this.nam,
    hp: this.hp,
    maxhp: this.maxhp,
    dmg: this.dmg,
    mag: this.mag,
    def: this.def,
    level: this.level,
    cex: this.cex,
    ex: this.ex,
    photo: this.photo
  };
}

/*
  @nam
 */
PlayerDataBase.prototype.__defineGetter__("nam", function(){
  return this.data.nam;
});
    
this.__defineSetter__("nam", function(val){
  this.data.nam = val;
});

/*
  @gold
 */
PlayerDataBase.prototype.__defineGetter__("gold", function(){
  return this.data.gold;
});
    
this.__defineSetter__("gold", function(val){
  this.data.gold = parseInt(val);
});

/*
  @vipgold
 */
PlayerDataBase.prototype.__defineGetter__("vipgold", function(){
  return this.data.vipgold;
});
    
this.__defineSetter__("vipgold", function(val){
  this.data.vipgold = parseInt(val);
});

/*
  @level
 */
PlayerDataBase.prototype.__defineGetter__("level", function(){
  return this.data.level;
});
    
this.__defineSetter__("level", function(val){
  this.data.level = parseInt(val);
});

/*
  @ex
 */
PlayerDataBase.prototype.__defineGetter__("ex", function(){
  return this.data.ex;
});
    
this.__defineSetter__("ex", function(val){
  this.data.ex = parseInt(val);
});

/*
  @cex
 */
PlayerDataBase.prototype.__defineGetter__("cex", function(){
  return this.data.cex;
});
    
this.__defineSetter__("cex", function(val){
  this.data.cex = parseInt(val);
});

/*
  @bag
 */
PlayerDataBase.prototype.__defineGetter__("bag", function(){
  return this.data.bag;
});
    
this.__defineSetter__("bag", function(val){
  this.data.bag = parseInt(val);
});

/*
  @storage
 */
PlayerDataBase.prototype.__defineGetter__("storage", function(){
  return this.data.storage;
});
    
this.__defineSetter__("storage", function(val){
  this.data.storage = parseInt(val);
});

/*
  @hp
 */
PlayerDataBase.prototype.__defineGetter__("hp", function(){
  return this.data.hp;
});
    
this.__defineSetter__("hp", function(val){
  this.data.hp = parseInt(val);
});

/*
  @dmg
 */
PlayerDataBase.prototype.__defineGetter__("dmg", function(){
  return this.data.dmg;
});
    
this.__defineSetter__("dmg", function(val){
  this.data.dmg = parseInt(val);
});

/*
  @mag
 */
PlayerDataBase.prototype.__defineGetter__("mag", function(){
  return this.data.mag;
});
    
this.__defineSetter__("mag", function(val){
  this.data.mag = parseInt(val);
});

/*
  @def
 */
PlayerDataBase.prototype.__defineGetter__("def", function(){
  return this.data.def;
});
    
this.__defineSetter__("def", function(val){
  this.data.def = parseInt(val);
});

/*
  @photo
 */
PlayerDataBase.prototype.__defineGetter__("photo", function(){
  return this.data.photo;
});
    
this.__defineSetter__("photo", function(val){
  this.data.photo = val;
});

/*
  @freecex
 */
PlayerDataBase.prototype.__defineGetter__("freecex", function(){
  return this.data.freecex;
});
    
this.__defineSetter__("freecex", function(val){
  this.data.freecex = parseInt(val);
});

/*
  @retime
 */
PlayerDataBase.prototype.__defineGetter__("retime", function(){
  return this.data.retime;
});
    
this.__defineSetter__("retime", function(val){
  this.data.retime = parseInt(val);
});


