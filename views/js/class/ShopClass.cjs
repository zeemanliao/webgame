

/*
***********************************************************************************************
============================================商店子元件===========================================
***********************************************************************************************
*/
function ShopClass(data) {
  var self = this;

  this.frame = $('#' + data.frameName);
  this.buttonName = data.buttonName;
  this.com2 = data.com2;
  this.checkShow = data.checkShow;

  live('.'+this.com2+'_button',{
    click:function (event) {

      var item = o.storage.bag[settings.storageType.bag].items[$(this).attr('data')];

      if (!item)
        return ;
      
      if (item.base.coins * item.data.level > parseInt(o.chara.data.gold)) {
        o.message.show('您的金錢不足「'+item.coins+'」<br><br>無法升級「'+item.nam+'」');
      } else {
        coms.item.emit(self.com2, item.id);
      }
    }
  });
}

ShopClass.prototype.clear = function() {
  this.frame.empty();
}

ShopClass.prototype.show = function() {
  this.frame.show();
}
ShopClass.prototype.hide = function() {
  this.frame.hide();
}
ShopClass.prototype.reflush = function() {
  this.clear();
  var items = o.storage.bag[settings.storageType.bag].items;
  for (var i in items) {
    var item = items[i];
    if (this.checkShow(item, items)){
    this.frame.append('<li id="item'+item.id+'">'+
              '<div class="label" gid="nam">'+'lv.'+item.data.level+item.base.nam+'</div>'+
              '<div gid="attr">'+tool.getAttr(item)+'</div>'+
              '<div class="number" gid="mixInfo">x'+item.data.num+'<br>$'+(item.data.level * item.base.coins)+'</div>'+
              '<btn class="'+this.com2+'_button" data="'+item.id+'">'+this.buttonName+'</btn>'+
              '</li>');
    }
  }
}


/*
***********************************************************************************************
============================================商店元件===========================================
***********************************************************************************************
*/
var ShopFrameClass = Object.Extend(BaseViewClass);

ShopFrameClass.prototype.initialize = function(){
  this.base();
  this.version = 0;
}

ShopFrameClass.prototype.create = function(){
  var self = this;
  this.frame = $('#shop_frame');
  this.content = this.frame.find('.city_content');
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

ShopFrameClass.prototype.update=function(){
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