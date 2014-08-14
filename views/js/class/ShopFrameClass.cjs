

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
    
    switch ($(this).attr('data')) {
      case 'sell':
        self.buy.hide();
        self.reSell.hide();
        self.sell.show();
        break;
      case 'reSell':
        self.buy.hide();
        self.sell.hide();
        self.reSell.show();
        break;
      case 'buy':
        self.sell.hide();
        self.reSell.hide();
        self.buy.show();
        break;
      default:
    }
  });
  tool.selectEvent(this.content.find('radio[data="buy"]'));
  this.buy = new ShopClass();

  this.sell = new MixClass({
    frameName:'shopSell',
    com2:'sell',
    buttonName:'賣<br>出',
    checkShow:function(item, items) {
      return item.data.storage == settings.storageType.bag;
    },
    getCoins:function(item) {
      return parseInt(item.data.level * item.base.coins /2);
    }
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
    checkShow:function(item, items) {
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