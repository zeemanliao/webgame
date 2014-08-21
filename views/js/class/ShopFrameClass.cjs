

/*
***********************************************************************************************
============================================商店子元件===========================================
***********************************************************************************************
*/
function ShopClass(data) {
  var self = this;
  this.version = 0;
  this.frame = $('#shopBuy');
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
  if (this.version != publicData.version.items) {
    this.version = publicData.version.items;
    this.clear();

    for (var i in publicData.items){
      var item = publicData.items[i];
      if (item.shop) {
      this.frame.append('<li>'+
          '<div class="label" gid="nam">'+item.nam+'</div>'+
          '<div gid="attr">'+tool.getAttr(new Item({baseID:item.id}))+'</div>'+
          '<div class="number" gid="coins">$'+item.coins+'</div>'+
          '<btn class="buyItem_button" coins="'+item.coins+'" data="'+item.id+'">購<br>買</btn>'+
          '</li>');
      }
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
  
}

ShopFrameClass.prototype.create = function(){
  var self = this;
  this.frame = $('#shop_frame');
  this.content = this.frame.find('.city_content');

  this.content.on('click', 'radio', function(event){
    
    event.stopPropagation();
    tool.selectEvent($(this));
    tool.childFunction($(this).parent(),
      function(_this) {
        self.content.find('#'+_this.attr('data')).hide();
      });
    self.content.find('#'+$(this).attr('data')).show();

  });
  tool.selectEvent(this.content.find('radio[data="buy"]'));
  this.buy = new ShopClass();

  this.sell = new MixClass({
    frameName:'shopSell',
    com2:'sell',
    buttonName:'賣<br>出',
    checkShow:function(item) {
      return item.data.storage == settings.storageType.bag;
    }
/*   , append:function(item) {
      var coins = parseInt(item.data.level * item.base.coins / 2);
      this.frame.append('<li id="<i></i>tem'+item.id+'">'+
        '<div class="label" gid="nam">'+'lv.'+item.data.level+item.base.nam+'</div>'+
        '<div gid="attr">'+tool.getAttr(item)+'</div>'+
        '<div class="number" gid="mixInfo"><input value="'+item.data.num+'" data="'+item.data.num+'" class="inputNum"><br>$'+coins+'</div>'+
        '<btn class="'+this.com2+'_button" data="'+item.id+'">'+this.buttonName+'</btn>'+
        '</li>');
    },

    emit:function(self2, thisObj, item) {
      var _num = parseInt(thisObj.parent().find('.inputNum').val());
      coms.item.emit(self2.com2, {id:item.id,num:_num});
    }
*/
  });

  this.reSell = new MixClass({
    frameName:'shopReSell',
    com2:'reSell',
    buttonName:'買<br>回',
    checkClick:function(item){
      if (item.base.coins * item.data.level > parseInt(o.chara.data.gold)) {
        o.message.show('您的金錢不足「'+item.coins+'」<br><br>無法升級「'+item.nam+'」');
        return false;
      }
      return true;
    },
    checkShow:function(item) {
      return item.data.storage == settings.storageType.sell;
    }
  });
 }

ShopFrameClass.prototype.update=function(){
  this.buy.reflush();
}

ShopFrameClass.prototype.reflush=function(){
  this.sell.reflush();
  this.reSell.reflush();
}

ShopFrameClass.prototype.clear = function() {
  this.sell.clear();
  this.reSell.clear();
}