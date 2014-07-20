
/*
***********************************************************************************************
============================================商店元件===========================================
***********************************************************************************************
*/
var ShopClass = Object.Extend(BaseViewClass);

ShopClass.prototype.initialize = function(){
  this.base();
  this.version = 0;
}

ShopClass.prototype.create = function(){
  var self = this;
  this.frame = $('#shop_frame');
  this.content = $('.city_content','#shop_frame');
 }

ShopClass.prototype.update=function(){
	if (this.version != db.version.items) {
		this.version = db.version.items;
		this.content.empty();

    var chara_level = o.chara.data.level;
		for (var i in db.items){
			var item = db.items[i];
			if (item.shop) {
      this.content.append('<btn data="map"' +
        'class="area_button">' + item.nam 
        +'</div>');
    	}
		}
	}
}