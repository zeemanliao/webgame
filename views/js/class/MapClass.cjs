
/*
***********************************************************************************************
============================================地圖元件===========================================
***********************************************************************************************
*/
var MapClass = Object.Extend(BaseViewClass);

MapClass.prototype.initialize=function(){
	this.ver = 0;
  this.base();
}
MapClass.prototype.create=function(){
  var self = this;
  this.frame = $('#map_frame');
  this.content = $('.city_content','#map_frame');
  this.nam = this.gid('area_nam');
  this.desc = this.gid('area_desc');
  live('.map_button',{
    click:function (event) {
      if ($(this).attr('enable') != 'true') {
        var map = db.maps[$(this).attr('map')];
        
        o.message.show('您的等級不足「'+map.level+'」<br><br>無法進入「'+map.nam+'」');
      } else {
        coms.map.emit('enter',$(this).attr('map'));
      }
    }
  });
}
MapClass.prototype.findArea = function(map_id) {
  map_id = parseInt(map_id);
  for (var i in db.areas) {
    var area = db.areas[i];
    var maps = area.sub;
    for (var m in maps) {
      if (map_id == maps[m]) {
        return area;
      }
    }
  }
}
MapClass.prototype.update=function(area){
  if (!area) {
    debug('未傳入area區域編號');
    return;
  }
  var area = db.areas[area];
  var sub_map_idx = area.sub;
  this.nam.html(area.nam);
  this.desc.html(area.desc);
  this.content.empty()
		for (var i in sub_map_idx){

			var map = db.maps[sub_map_idx[i]];
      
    this.content.append('<btn data="team" map="' + map.id + '" ' +
      'enable="'+(o.chara.data.level>=map.level)+'" class="map_button" gid="map-'+
        map.position.x+
        '-'+map.position.y+
        '"><span gid="nam">' + map.nam +'</span> <span gid="desc">'+
        map.desc +'</span><span gid="level">lv.' +
        + map.level
        +'</span></btn>');
	}
}