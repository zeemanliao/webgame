
/*
***********************************************************************************************
============================================地圖元件===========================================
***********************************************************************************************
*/
var AreaClass = Object.Extend(BaseViewClass);

AreaClass.prototype.initialize=function(){
	this.ver = 0;
  this.base();
}
AreaClass.prototype.create=function(){
  var self = this;
  this.frame = $('#area_frame');
  this.content = $('.city_content','#area_frame');
  this.nam = this.gid('nam');
  this.desc = this.gid('desc');
  live('.area_button',{
    click:function (event) {
      o.map.update($(this).attr('area'));
      self.city($(this));
    }
  });
}

AreaClass.prototype.reflush=function(){
  this.update();
}

AreaClass.prototype.update=function(){
	if (this.ver != db.ver.areas) {
		this.ver = db.ver.areas;
		this.content.empty();
		for (var i in db.areas){
			var area = db.areas[i];
      this.content.append('<btn data="map" area="' + area.id + '" ' +
        'enable="'+(o.chara.data.level>=area.level)+'" class="area_button" gid="area-'+
        area.position.x+
        '-'+area.position.y+
        '">' + area.nam 
        +'</div>');
		}
	}
}