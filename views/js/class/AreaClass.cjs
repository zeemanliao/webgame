
/*
***********************************************************************************************
============================================地圖元件===========================================
***********************************************************************************************
*/
var AreaClass = Object.Extend(BaseViewClass);

AreaClass.prototype.initialize=function(){
	this.version = 0;
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
      if ($(this).attr('enable') != 'true') {
        var area = publicData.areas[$(this).attr('area')];
        
        o.message.show('您的等級不足「'+area.level+'」<br><br>無法進入「'+area.nam+'」');
      } else {
        o.map.update($(this).attr('area'));
        self.city($(this));
      }
    }
  });
}

AreaClass.prototype.reflush=function(){
  this.update();
}

AreaClass.prototype.update=function(){
	if (this.version != publicData.version.areas) {
		this.version = publicData.version.areas;
		this.content.empty();

    var chara_level = o.chara.data.level;
		for (var i in publicData.areas){
			var area = publicData.areas[i];
      var area_level = area.level;
      this.content.append('<btn data="map" area="' + area.id + '" ' +
        'enable="'+(chara_level>=area_level)+'" class="area_button" gid="area-'+
        area.position.x+
        '-'+area.position.y+
        '">' + area.nam 
        +'</div>');
		}
	}
}