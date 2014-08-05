/*
***********************************************************************************************
============================================背包清單元件===========================================
***********************************************************************************************
*/
function BagClass(data) {
  var self = this;

  this.type = data.BagType;
  this.frame = $('#'+data.frameName);
  this.buttonName = data.buttonName;

  this.limitLabel = this.frame.find('.storage_limit');
  this.itemList = this.frame.find('.itemList');

  this.filter = settings.BagType.weapon;

  this._limit = 0;
  this.items = {};
  this.fcount = {
    1:0,
    2:0,
    3:0,
    4:0,
    5:0,
    6:0,
    7:0,
    8:0,
    9:0,
    10:0
  };
  this.itemList.on('click','btn',
    function (event) {
      event.stopPropagation();
      coms.item.emit('move', $(this).attr('data'));
    });
  this.frame.on('click','radio',
    function (event){
      event.stopPropagation();
      gameTool.selectEvent($(this));
      
      self.filter = $(this).attr('data');
      self.reflush();
    });
  //this.frame.click(function (e){
     //e.preventDefault();
  //});
  this.clear();
}

BagClass.prototype.__defineGetter__("limit", function(){
  return this._limit;
});
    
BagClass.prototype.__defineSetter__("limit", function(val){
  this._limit = parseInt(val);
  this.reflushLimit();
});

BagClass.prototype.reflush = function() {
  this.clear();

  for (var i in this.items){
    var item = this.items[i];
    if (item.base.type == this.filter)
    this.itemList.append('<li id="item'+item.id+'">'+
              '<div class="label" gid="nam">'+'lv.'+item.level+item.base.nam+'</div>'+
              '<div gid="attr">'+gameTool.getAttr(item)+'</div>'+
              '<div class="number" gid="coins">x'+item.num+'</div>'+
              '<btn class="BagButton" data="'+item.id+'">'+this.buttonName+'</btn>'+
              '</li>');
  }
  this.reflushLimit();
}

BagClass.prototype.reflushLimit = function(){
  var _count = Object.keys(this.items).length;
  var _fcount = 0;
  var self = this;
  for (var i in this.fcount){
    this.fcount[i] = 0;
  }
  for (var i in this.items) {
    if (this.items[i].base.type == this.filter)
      _fcount ++;
    this.fcount[this.items[i].base.type] += 1;
  }
  for (var i in this.fcount){
    this.frame.find('.selectType').each(function(index){
      var _cnt = self.fcount[$(this).attr('data')];
      _cnt = _cnt !=0 ? _cnt:'';
      $(this).find('.itemCount').html(_cnt);
    });
  }
  this.limitLabel.html(_fcount + '/' + _count + '/' + this._limit);
}

BagClass.prototype.add = function(item) {
  item.base = db.items[item.baseID];
  this.items[item.id] = item;
}

BagClass.prototype.clear = function() {
  this.itemList.empty();
}

BagClass.prototype.remove = function(itemID) {
  delete this.items[itemID];
  this.itemList.find('#item'+itemID).remove();
}
/*
***********************************************************************************************
============================================背包元件===========================================
***********************************************************************************************
*/
var BagFrameClass = Object.Extend(BaseViewClass);

BagFrameClass.prototype.initialize=function(){
  this.base();
}

BagFrameClass.prototype.create=function(){
  var self = this;
  this.bag = [];
	this.frame = $('#bag_frame');
  this.bag[settings.BagType.bag] = new BagClass({
    type: settings.BagType.bag,
    frameName: 'equipment_content',
    buttonName: '取下'
  });
  this.bag[settings.BagType.Bag] = new BagClass({
    type:settings.BagType.Bag,
    frameName: 'bag_content2',
    buttonName: '裝備'
  });

  this.frame.bind("click",function(){self.click()});
  //this.Bag_list.click(function (e){
     //e.stopPropagation();
  //});

  //this.bag_list.click(function (e){
     //e.stopPropagation();
  //});
}
BagFrameClass.prototype.add = function(item){
  this.bag[item.Bag].add(item);
}

BagFrameClass.prototype.remove = function(itemID){
  for (var i in this.bag)
    this.bag[i].remove(itemID);
}

BagFrameClass.prototype.reflush = function(){
  for (var i in this.bag)
    this.bag[i].reflush();
}

BagFrameClass.prototype.click = function(){
  this.frame.fadeOut("fast");
}

BagFrameClass.prototype.show= function(val,loginout){
  if (!this.frame.is(":visible")){
    this.frame.fadeIn("fast");
  }
}
