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
  debug('run All reflush');
  for (var i in o){
    if (typeof(o[i].reflush)=='function'){
      o[i].reflush();
    }
  }
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
coms.sys = new BaseCom("sys");
coms.ready = new BaseCom("ready");
coms.city = new BaseCom("city");
coms.guest = new BaseCom("guest");
coms.map = new BaseCom("map");
coms.team = new BaseCom("team");
coms.battle = new BaseCom("battle");
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

coms.sys.conf = function(data){
  conf = data;
}
coms.sys.ver = function(data){
  db.put('ver',data);
}
coms.sys.db = function(data){
  for (var i in data){
    debug('載入db->'+i+'=>');
    debug(data[i]);
    db.put(i,data[i]);
  }
}

/*

        City

 */
coms.city.move = function(data){
  f = o[data];
  if (f) {
    if ($('#city').is(':hidden')) {
      $('#battle').hide();
      $('#city').show();
    }
    $('.content_frame').hide();
    f.show();
  } else {
    debug('Object:'+obj.attr('data')+'->can not find');
  }
}
/*

      Battle

*/
coms.battle.move = function(data){
  o.battle.reset(data);
  if ($('#battle').is(':hidden')) {
    $('#battle').show();
    $('#city').hide();
  }
}
coms.battle.addMember = function(data){
  o.battle.addMember(data);
}
coms.battle.removeMember = function(data){
  o.battle.removeMember(data);
}

/*
  此區為剛登入後資料就續後需先執行的區域
 */
coms.ready.load = function(){
  log('載入Ready Load');
  GameContent.show();
  $('#load_frame').hide();
}