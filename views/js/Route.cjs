/*
***********************************************************************************************
==========================================Route================================================
***********************************************************************************************
*/
function route(data){
  if (!data)
    return;

    for (var i in data){
      var obj = coms[i];

      if (obj) {
        debug('指令元件'+i);
        obj.on(data[i]);
      } else {
        debug('Route找不到指令'+i);
      }
  }
  /*
  debug('run All reflush');
  for (var i in o){
    if (typeof(o[i].reflush)=='function'){
      o[i].reflush();
    }
  }
  */
}

var BaseCom = Class.create();
BaseCom.prototype = {
  initialize: function(com_name) {
    this.com = com_name;
  },
  emit: function(com2,data){
    debug('emit act com:'+this.com+',com2:'+com2+',data=>');
    debug(data);
    socket.emit('act',{com:this.com,com2:com2,data:data});
  },
  on: function(data){
    if (!data){
      return debug(this.com+'.on未傳入資料');
    }

    for (var i in data){
      var obj = this[i];
      if (typeof obj != 'function') {
        debug('找不到指令'+this.com+'->'+i);
      } else {
        debug('執行'+this.com+'->'+i+'傳入資料=>');
        debug(data[i]);
        this[i](data[i]);
      }
    }
    
  }
}
var coms = {};


coms.chara = new BaseCom("chara");
coms.login = new BaseCom("login");
coms.sys = new BaseCom("sys");
coms.city = new BaseCom("city");
coms.guest = new BaseCom("guest");
coms.map = new BaseCom("map");
coms.team = new BaseCom("team");
coms.battle = new BaseCom("battle");
coms.enemy = new BaseCom("enemy");
coms.debug = new BaseCom("debug");
coms.item = new BaseCom("item");
/*

      Team

 */
coms.team.list = function(data) {
  o.team.clear();
  for (var i in data) {
      o.team.addTeam(data[i]);
  }
}
coms.team.addTeam = function(data) {
  o.team.addTeam(data);
}

coms.team.map = function(data) {
  var map_id = data;
  o.team.updateInfo(map_id);
}

coms.team.updateTeam = function(data) {
  o.team.updateTeam(data);
}

coms.team.removeTeam = function(data){
  var team_id = data;
  o.team.removeTeam(team_id);
}
/*

      Item

 */
coms.item.add = function(items) {
  for (var i in items){
    o.storage.add(items[i]);
  }
  o.storage.reflush();
}

coms.item.remove = function(itemIDs){
  for (var i in itemIDs)
    o.storage.remove(itemIDs[i]);
  o.storage.reflush();
}

coms.item.limit = function(data) {
  for (var i in data) {
    if (o.storage.bag[i])
      o.storage.bag[i].limit = data[i];
  }
}

coms.item.equipment = function(data) {
  
}
/*

      Guest

 */
coms.guest.add = function(data){
  if (data)
    o.guest.add(data);
  else
    debug('Route guest add data empty');
}
coms.guest.remove = function(data){
  if (data)
    o.guest.remove(data);
  else
    debug('Route guest remove nam empty')
}

/*

      Chara

 */
coms.chara.update = function(data) {
  o.chara.update(data);
}

/*

        City

 */
coms.city.move = function(data){
  f = o[data.nam];
  if (f) {
    if (!data.alert){
      if ($('#city').is(':hidden')) {
        $('#battle').hide();
        $('#city').show();
      }
      $('.content_frame').hide();
    }
    f.show();
  } else {
    debug('Object:'+obj.attr('data')+'->can not find');
  }
}
/*

      Enemy

*/
coms.enemy.add = function(data){
  o.enemy.add(data);
}
/*

      Battle

*/
coms.battle.init = function(data){
  o.battle.init(data);
  if ($('#battle').is(':hidden')) {
    $('#battle').show();
    $('#city').hide();
  }
}
coms.battle.addEnemy = function(data){
  o.battle.addEnemy(data);
}
coms.battle.addMember = function(data){
  o.battle.addMember(data);
}
coms.battle.removeMember = function(data){
  o.battle.removeMember(data);
}
coms.debug.test = function(data){
  debug(data);
}
/*

      Login

*/
coms.login.getVersion = function(data){
  socket.emit('checkAndUpdateVersion', db.version);
}

coms.login.updateLoaclStorage = function(data){
  
  for (var i in data){
    debug('載入db->'+i+'=>');
    debug(data[i]);
    db.put(i,data[i]);
  }
  socket.emit('loadAllData', {});
}

/*
  此區為剛登入後資料就續後需先執行的區域
 */
coms.login.ready = function(){
  log('載入Ready Load');
  GameContent.show();
  $('#load_frame').hide();
  //o.area.update();
}