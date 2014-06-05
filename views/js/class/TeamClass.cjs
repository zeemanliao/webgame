
/*
***********************************************************************************************
============================================組隊元件===========================================
***********************************************************************************************
*/
var TeamClass = Object.Extend(BaseViewClass);

TeamClass.prototype.initialize=function(){
  this.base();
}
TeamClass.prototype.create=function(){
  var self = this;
  this.speed = 200;
  this.frame = $('#team_frame');
  this.content = $('.city_content','#team_frame');
  this.area_nam=this.gid('area_nam');
  this.map_nam=this.gid('map_nam');
  this.map_desc=this.gid('map_desc');
  this.map;
  live('.members > .member',{
    mouseover:function(){
      
        // 當滑鼠移到選項時, 把它後面選項都滑動回去
        // 再把自己跟前面的選項都往前滑揩
        $(this).nextAll().each(slideBack).end().prevAll().andSelf().each(function(){
          var _this = $(this);
          //if(_navLi.index(_this)>0){
          if (_this.attr('sn') != '0') {
            _this.stop().animate({
              left: _this.data("left") - (200 - 50)
            }, 200);
          }
        });
      }
  });
  live('.members',{
  mouseleave:function(){
      $(".member", this).each(slideBack);
    }
  });
  bind('[gid="create_team"]',{
    click:function(){
      coms.team.emit('create',{map:self.map.id,pwd:$('[gid="team_pass"]').val()});
      
    }
  });
 }
TeamClass.prototype.updateInfo = function(data) {
  var map_id = parseInt(data);

  this.map = db.maps[map_id];
  this.area_nam.html(o.map.findArea(data).nam);
  this.map_nam.html(this.map.nam);
  this.map_desc.html(this.map.desc);
}
TeamClass.prototype.clear=function(){
  this.content.empty();
}
TeamClass.prototype.addTeam=function(team){
  var self = this;

  var html='<div class="team" team="'+team.id+'">\n<btn class="join">Join</btn>\n<ul class="members">\n';
  
  html +='\n</ul>\n</div>';

  this.content.append(html);
  this.putTeamData(team);
}
TeamClass.prototype.putTeamData=function(team){
  var members = this.content.find("[team=" + team.id + "] > .members");
  var html='';
  for (var m in team.members) {
    var member = team.members[m];
    html+=this.getMemberHtml(member,m);
  }
  members.append(html);
  var _navLi = this.content.find("[team=" + team.id + "] > .member");
  _navLi.each(function(i){
    var _this = $(this),
    _idx = parseInt(_this.attr('sn'));
    
    var _left = 0;
    switch (_idx) {
      case 0:
        _left = 0;
        break;
      default:
        _left = 200 + (_idx-1) * 50;
    }
    // 先把每一個 li 的位置都放到定位

    // 並把 left 值記錄起來
    _this.css("left", _left).data("left", _left);
  });
}
TeamClass.prototype.getMemberHtml=function(member,m){
  return '<li class ="member" sn="'+m+'" nam="'+member.nam+'">'+
          '  <img class="photo" src="/images/'+member.photo+'">'+
          '  <div class="nam">'+member.nam+'</div>'+
          '  <div class="lv">lv.'+member.level+'</div>'+
          '  <div class="cex">cex.'+member.cex+'</div>'+
          '</li>';
}

TeamClass.prototype.updateTeam=function(team){
  this.putTeamData(team);
}

TeamClass.prototype.removeTeam=function(team_id){
  this.content.find('[team='+team_id+']').remove();
}


  // 控制選項的滑動
  function slideBack(){
    var _this = $(this);
    _this.stop().animate({
      left: _this.data("left")
    }, 200);
  }
