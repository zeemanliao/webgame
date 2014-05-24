
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
 $('.map_button').live({
    mouseenter: function() {       
      $(this).delay(0).animate({opacity:'1'},50);
    },
    mouseleave: function() {
      $(this).delay(0).animate({opacity:'0.6'},50);
    },
    click:function (event) {
        event.preventDefault();
        
        $(this).delay(0).animate(
          {
            width: $(this).width()+10,
            height: $(this).height()+10,
            top: $(this).position().top-5,
            left: $(this).position().left-5
          }
          ,50
          );
       $(this).delay(0).animate(
           {
              width: $(this).width(),
              height: $(this).height(),
              top: $(this).position().top,
              left: $(this).position().left
            },
           50,
           null,
           function(){
             
           }
         );
      }
  });
}

MapClass.prototype.reflush=function(){
	this.update();
}

MapClass.prototype.update=function(){
	if (this.ver != db.ver.maps) {
		this.ver = db.ver.maps;
		this.content.empty();
		for (var i in db.maps){
			var map = db.maps[i];
			this.content.append('<div class="map_button" gid="map-'+
				map.position.x+
				'-'+map.position.y+
				'">' + map.nam 
				+'</div>');
			debug(map.nam);
		}
	}
}