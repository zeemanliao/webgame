
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
    
    switch ($(this).attr('data')) {
      case 'levelUp':
        self.levelDown.hide();
        self.levelUp.show();
        break;
      case 'levelDown':
        self.levelUp.hide();
        self.levelDown.show();
        break;
      default:
    }
  });
  tool.selectEvent(this.content.find('radio[data="levelUp"]'));

  this.levelUp = new MixClass({
    frameName:'mixLevelUp',
    com2:'levelUp',
    buttonName:'升<br>級',
    checkShow:function(item, items) {
      var _num = 0;
      for (var i in items) {
        if (items[i].data.level == 1 && 
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
    checkShow:function(item, items) {
      return item.data.level > 1;
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