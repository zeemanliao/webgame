var tool = require('../../util/tool');
var clone = require('../../util/clone');

function CharaBase(data) {
    this.data = {};
    this.CharaBase = {};

    clone(data, this.data);
    clone(data, this.CharaBase);
}

module.exports = CharaBase;

CharaBase.prototype.getChangeData = function() {
  var _changeData = {};

  for (var i in this.CharaBase) {
    if (this.CharaBase[i] != this.data[i]) {
      changeData[i] = data2[i]; 
    }
  }
  return changeData;
}

CharaBase.prototype.getBattleData = function() {
    return {
        pos: this.data.pos,
        nam: this.data.nam,
        tick: this.data.tick,
        tickbase: this.data.tickbase,
        hp: this.data.hp,
        maxhp: this.data.maxhp,
        dmg: this.data.dmg,
        mag: this.data.mag,
        def: this.data.def,
        level: this.data.level,
        cex: this.data.cex,
        ex: this.data.ex,
        photo: this.data.photo
    };
}

CharaBase.prototype.getInfoData = function() {
    return {
        nam: this.data.nam,
        gold: this.data.gold,
        vipgold: this.data.vipgold,
        level: this.data.level,
        ex: this.data.ex,
        cex: this.data.cex,
        bag: this.data.bag,
        storage: this.data.storage,
        hp: this.data.hp,
        dmg: this.data.dmg,
        mag: this.data.mag,
        def: this.data.def,
        photo: this.data.photo,
        map: this.data.map,
        freecex: this.data.freecex,
        retime: this.data.retime
    };
}

CharaBase.prototype.clientGuestData = function() {
    return {
        nam: this.data.nam,
        level: this.data.level,
        ex: this.data.ex,
        cex: this.data.cex,
        retime: this.data.retime
    };
}
