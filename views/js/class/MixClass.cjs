
/*
***********************************************************************************************
============================================工匠元件===========================================
***********************************************************************************************
*/
var MixClass = Object.Extend(BaseViewClass);

MixClass.prototype.initialize=function(){
  this.base();
}

MixClass.prototype.create=function(){
  var self = this;
  this.frame = $('#mix_frame');
  this.content = $('.city_content','#mix_frame');
  this.itemList = this.content.find('.itemList');
  live('.lupItem_button',{
    click:function (event) {

      var item = o.storage.bag[settings.storageType.bag].items[$(this).attr('data')];

      if (!item)
        return ;
      
      if (item.base.coins * item.data.level > parseInt(o.chara.data.gold)) {
        o.message.show('您的金錢不足「'+item.coins+'」<br><br>無法升級「'+item.nam+'」');
      } else {
        coms.item.emit('levelup',item.id);
      }
    }
  });
  this.clear();
}

MixClass.prototype.clear = function() {
	this.itemList.empty();
}

MixClass.prototype.reflush = function() {
  this.clear();
	var items = o.storage.bag[settings.storageType.bag].items;
	var _data = {};

	for (var i in items) {
		var item = items[i];
		if (this.checkCanLevelup(item, items)){
    this.itemList.append('<li id="item'+item.id+'">'+
              '<div class="label" gid="nam">'+'lv.'+item.data.level+item.base.nam+'</div>'+
              '<div gid="attr">'+tool.getAttr(item)+'</div>'+
              '<div class="number" gid="mixInfo">x'+item.data.num+'<br>$'+(item.data.level * item.base.coins)+'</div>'+
              '<btn class="lupItem_button" data="'+item.id+'">升<br>級</btn>'+
              '</li>');
		}
	}
}

MixClass.prototype.checkCanLevelup = function(item, items) {
	var _num = 0;
	for (var i in items) {
		if (items[i].data.level == 1 && 
			item.data.baseID == items[i].data.baseID) {
			_num += items[i].data.num;
		}
	}
	return _num > 1 &&_num >= item.data.level;
}