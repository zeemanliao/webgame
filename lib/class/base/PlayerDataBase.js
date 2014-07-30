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
    mp: this.mp,
    maxmp: this.maxmp,
    str: this.str,
    int: this.int,
    mag: this.mag,
    dex: this.dex,
    vit: this.vit,
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
    maxhp: this.maxhp,
    mp: this.mp,
    maxmp: this.maxmp,
    str: this.str,
    int: this.int,
    mag: this.mag,
    dex: this.dex,
    vit: this.vit,
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
    mp: this.mp,
    maxmp: this.maxmp,
    str: this.str,
    int: this.int,
    mag: this.mag,
    dex: this.dex,
    vit: this.vit,
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
    
PlayerDataBase.prototype.__defineSetter__("nam", function(val){
  this.data.nam = val;
});

/*
  @gold
 */
PlayerDataBase.prototype.__defineGetter__("gold", function(){
  return this.data.gold;
});
    
PlayerDataBase.prototype.__defineSetter__("gold", function(val){
  this.data.gold = parseInt(val);
});

/*
  @vipgold
 */
PlayerDataBase.prototype.__defineGetter__("vipgold", function(){
  return this.data.vipgold;
});
    
PlayerDataBase.prototype.__defineSetter__("vipgold", function(val){
  this.data.vipgold = parseInt(val);
});

/*
  @level
 */
PlayerDataBase.prototype.__defineGetter__("level", function(){
  return this.data.level;
});
    
PlayerDataBase.prototype.__defineSetter__("level", function(val){
  this.data.level = parseInt(val);
});

/*
  @ex
 */
PlayerDataBase.prototype.__defineGetter__("ex", function(){
  return this.data.ex;
});
    
PlayerDataBase.prototype.__defineSetter__("ex", function(val){
  this.data.ex = parseInt(val);
});

/*
  @cex
 */
PlayerDataBase.prototype.__defineGetter__("cex", function(){
  return this.data.cex;
});
    
PlayerDataBase.prototype.__defineSetter__("cex", function(val){
  this.data.cex = parseInt(val);
});

/*
  @bag
 */
PlayerDataBase.prototype.__defineGetter__("bag", function(){
  return this.data.bag;
});
    
PlayerDataBase.prototype.__defineSetter__("bag", function(val){
  this.data.bag = parseInt(val);
});

/*
  @storage
 */
PlayerDataBase.prototype.__defineGetter__("storage", function(){
  return this.data.storage;
});
    
PlayerDataBase.prototype.__defineSetter__("storage", function(val){
  this.data.storage = parseInt(val);
});

/*
  @hp
 */
PlayerDataBase.prototype.__defineGetter__("hp", function(){
  return this.data.hp;
});
    
PlayerDataBase.prototype.__defineSetter__("hp", function(val){
  this.data.hp = parseInt(val);
});

/*
  @maxhp
 */
PlayerDataBase.prototype.__defineGetter__("maxhp", function(){
  return this.data.maxhp;
});
    
PlayerDataBase.prototype.__defineSetter__("maxhp", function(val){
  this.data.maxhp = parseInt(val);
});
/*
  @mp
 */
PlayerDataBase.prototype.__defineGetter__("mp", function(){
  return this.data.mp;
});
    
PlayerDataBase.prototype.__defineSetter__("mp", function(val){
  this.data.mp = parseInt(val);
});
/*
  @maxmp
 */
PlayerDataBase.prototype.__defineGetter__("maxmp", function(){
  return this.data.maxmp;
});
    
PlayerDataBase.prototype.__defineSetter__("maxmp", function(val){
  this.data.maxmp = parseInt(val);
});
/*
  @str
 */
PlayerDataBase.prototype.__defineGetter__("str", function(){
  return this.data.str;
});
    
PlayerDataBase.prototype.__defineSetter__("str", function(val){
  this.data.str = parseInt(val);
});

/*
  @int
 */
PlayerDataBase.prototype.__defineGetter__("int", function(){
  return this.data.int;
});
    
PlayerDataBase.prototype.__defineSetter__("int", function(val){
  this.data.int = parseInt(val);
});

/*
  @mag
 */
PlayerDataBase.prototype.__defineGetter__("mag", function(){
  return this.data.mag;
});
    
PlayerDataBase.prototype.__defineSetter__("mag", function(val){
  this.data.mag = parseInt(val);
});

/*
  @dex
 */
PlayerDataBase.prototype.__defineGetter__("dex", function(){
  return this.data.dex;
});
    
PlayerDataBase.prototype.__defineSetter__("dex", function(val){
  this.data.dex = parseInt(val);
});

/*
  @vit
 */
PlayerDataBase.prototype.__defineGetter__("vit", function(){
  return this.data.vit;
});
    
PlayerDataBase.prototype.__defineSetter__("vit", function(val){
  this.data.vit = parseInt(val);
});
/*
  @photo
 */
PlayerDataBase.prototype.__defineGetter__("photo", function(){
  return this.data.photo;
});
    
PlayerDataBase.prototype.__defineSetter__("photo", function(val){
  this.data.photo = val;
});

/*
  @freecex
 */
PlayerDataBase.prototype.__defineGetter__("freecex", function(){
  return this.data.freecex;
});
    
PlayerDataBase.prototype.__defineSetter__("freecex", function(val){
  this.data.freecex = parseInt(val);
});

/*
  @retime
 */
PlayerDataBase.prototype.__defineGetter__("retime", function(){
  return this.data.retime;
});
    
PlayerDataBase.prototype.__defineSetter__("retime", function(val){
  this.data.retime = parseInt(val);
});
