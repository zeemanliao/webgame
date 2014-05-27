
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
  this.nam = this.gid('nam');
  this.desc = this.gid('desc');
  live('.map_button',{
    click:function (event) {
      self.battle($(this));
    }
  });
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
      
    this.content.append('<btn data="' + map.id + '" ' +
      'enable="'+(o.chara.data.level>=map.level)+'" class="map_button" gid="map-'+
        map.position.x+
        '-'+map.position.y+
        '"><span gid="nam">' + map.nam +'</span> <span gid="desc">'+
        map.desc +'</span><span gid="level">lv.' +
        + map.level
        +'</span></btn>');
	}
}