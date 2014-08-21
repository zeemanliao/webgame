
/*
***********************************************************************************************
============================================工匠子元件===========================================
***********************************************************************************************
*/
function MixClass(data) {
  var self = this;

  this.frame = $('#' + data.frameName);
  this.buttonName = data.buttonName;
  this.com2 = data.com2;
  this.checkShow = data.checkShow;
  this.storageType = data.storageType;

  if (typeof(data.getCoins)==='function')
    this.getCoins = data.getCoins;

  if (typeof(data.append)==='function')
    this.append = data.append;

  if (typeof(data.emit)==='function')
    this.emit = data.emit;

  live('.'+this.com2+'_button',{
    click:function (event) {

      var item = items[$(this).attr('data')];

      if (!item)
        return ;
      
      if (typeof(checkClick) ==='function' &&
          !checkClick(item)) {
          return;
      }
      self.emit(self, $(this), item);
    }
  });
}

MixClass.prototype.emit = function(self2, thisObj, item) {
  coms.item.emit(self2.com2, item.id);
}

MixClass.prototype.clear = function() {
	this.frame.empty();
}

MixClass.prototype.show = function() {
  this.frame.show();
}

MixClass.prototype.hide = function() {
  this.frame.hide();
}

MixClass.prototype.reflush = function() {
  this.clear();

	for (var i in items) {
		var item = items[i];
		if (this.checkShow(item, items)){
      this.append(item)
		}
	}
}

MixClass.prototype.append = function(item) {
  this.frame.append('<li id="item'+item.id+'">'+
            '<div class="label" gid="nam">'+'lv.'+item.data.level+item.base.nam+'</div>'+
            '<div gid="attr">'+tool.getAttr(item)+'</div>'+
            '<div class="number" gid="mixInfo">x'+item.data.num+'<br>$'+(item.data.level * item.base.coins)+'</div>'+
            '<btn class="'+this.com2+'_button" data="'+item.id+'">'+this.buttonName+'</btn>'+
            '</li>');
}

MixClass.prototype.getCoins = function(item) {
  return item.data.level * item.base.coins;
}

/*
***********************************************************************************************
============================================工匠元件===========================================
***********************************************************************************************
*/
var MixFrameClass = Object.Extend(BaseViewClass);

MixFrameClass.prototype.initialize=function(){
  this.base();
}

MixFrameClass.prototype.create=function(){
  var self = this;
  this.frame = $('#mix_frame');
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
  tool.selectEvent(this.content.find('radio[data="levelUp"]'));

  this.levelUp = new MixClass({
    frameName:'mixLevelUp',
    com2:'levelUp',
    buttonName:'升<br>級',
    checkClick:function(item){
      if (item.base.coins * item.data.level > parseInt(o.chara.data.gold)) {
        o.message.show('您的金錢不足「'+item.coins+'」<br><br>無法升級「'+item.nam+'」');
        return false;
      }
      return true;
    },
    checkShow:function(item) {
      var _num = 0;
      for (var i in items) {
        if (
          item.data.storage == settings.storageType.bag &&
          items[i].data.storage == settings.storageType.bag &&
          items[i].data.level == 1 && 
          item.data.baseID == items[i].data.baseID) {
          _num += items[i].data.num;
        }
      }
      return _num > 1 &&_num >= item.data.level;
    }
  });
  
  this.levelDown = new MixClass({
    frameName:'mixLevelDown',
    com2:'levelDown',
    buttonName:'拆<br>分',
    checkClick:function(item){
      if (item.base.coins * item.data.level > parseInt(o.chara.data.gold)) {
        o.message.show('您的金錢不足「'+item.coins+'」<br><br>無法升級「'+item.nam+'」');
        return false;
      }
      return true;
    },
    checkShow:function(item) {
      return item.data.storage == settings.storageType.bag && item.data.level > 1;
    }
  });
  this.clear();
}

MixFrameClass.prototype.clear = function() {
  this.levelUp.clear();
  this.levelDown.clear();
}

MixFrameClass.prototype.reflush = function() {
  this.levelUp.reflush();
  this.levelDown.reflush();
}