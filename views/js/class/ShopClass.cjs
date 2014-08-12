
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
  this.itemList = this.content.find('.itemList');
  live('.buyItem_button',{
    click:function (event) {
      var item = publicData.items[$(this).attr('data')];
      if (!item)
        return;
      if (item.coins > parseInt(o.chara.data.gold)) {
        o.message.show('您的金錢不足「'+item.coins+'」<br><br>無法購買「'+item.nam+'」');
      } else {
        coms.item.emit('buy',item.id);
      }
    }
  });
 }

ShopClass.prototype.update=function(){
	if (this.version != publicData.version.items) {
		this.version = publicData.version.items;
		this.itemList.empty();

		for (var i in publicData.items){
			var item = publicData.items[i];
			if (item.shop) {
      this.itemList.append('<li>'+
          '<div class="label" gid="nam">'+item.nam+'</div>'+
          '<div gid="attr">'+tool.getAttr(new Item({baseID:item.id}))+'</div>'+
          '<div class="number" gid="coins">$'+item.coins+'</div>'+
          '<btn class="buyItem_button" coins="'+item.coins+'" data="'+item.id+'">購<br>買</btn>'+
          '</li>');
    	}
		}
	}
}