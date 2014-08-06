/*
***********************************************************************************************
============================================倉庫清單元件===========================================
***********************************************************************************************
*/
function StorageClass(data) {
  var self = this;

  this.type = data.storageType;
  this.frame = $('#'+data.frameName);
  this.buttonName = data.buttonName;

  this.limitLabel = this.frame.find('.storage_limit');
  this.itemList = this.frame.find('.itemList');

  this.filter = settings.equipmentType.weapon;

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

StorageClass.prototype.__defineGetter__("limit", function(){
  return this._limit;
});
    
StorageClass.prototype.__defineSetter__("limit", function(val){
  this._limit = parseInt(val);
  this.reflushLimit();
});

StorageClass.prototype.reflush = function() {
  this.clear();

  for (var i in this.items){
    var item = this.items[i];
    if (item.base.type == this.filter)
    this.itemList.append('<li id="item'+item.id+'">'+
              '<div class="label" gid="nam">'+'lv.'+item.level+item.base.nam+'</div>'+
              '<div gid="attr">'+gameTool.getAttr(item)+'</div>'+
              '<div class="number" gid="coins">x'+item.num+'</div>'+
              '<btn class="StorageButton" data="'+item.id+'">'+this.buttonName+'</btn>'+
              '</li>');
  }
  this.reflushLimit();
}

StorageClass.prototype.reflushLimit = function(){
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

StorageClass.prototype.add = function(item) {
  item.base = db.items[item.baseID];
  this.items[item.id] = item;
}

StorageClass.prototype.clear = function() {
  this.itemList.empty();
  this.limitLabel.empty();
}

StorageClass.prototype.remove = function(itemID) {
  delete this.items[itemID];
  this.itemList.find('#item'+itemID).remove();
}

/*
***********************************************************************************************
============================================倉庫清單元件===========================================
***********************************************************************************************
*/
function EquipmentClass(data) {
  var self = this;

  this.type = data.storageType;
  this.frame = $('#'+data.frameName);
  this.buttonName = data.buttonName;

  this.limitLabel = this.frame.find('.storage_limit');
  this.itemList = this.frame.find('.itemList');

  this.items = {};

  this.itemList.on('click','btn',
    function (event) {
      event.stopPropagation();
      coms.item.emit('remove', $(this).attr('data'));
    });

  this.clear();
}


EquipmentClass.prototype.equip = function(item) {
  item.base = db.items[item.baseID];
  var item = this.frame.find('[gid=equipmentType_'+item.base.type+']');
  item.find('[gid=nam]').html(item.nam);
  item.find('[gid=attr]').html(gameTool.getAttr(item));
  //item.find('.number').html(item.nam.num);
  item.find('btn').show();
}

EquipmentClass.prototype.clear = function(equipmentType) {
  for (var i = 1; i<=10 ;i++) {
    if (!equipmentType || this.items[equipmentType]) {
      var item = this.frame.find('[gid=equipmentType_'+ i + ']');
      item.find('[gid=nam]').empty();
      item.find('[gid=attr]').empty();
      item.find('.number').empty();
      item.find('btn').hide();
    }
  }
}


EquipmentClass.prototype.remove = function(equipmentType) {
  delete this.items[equipmentType];
  this.clear(equipmentType);
}
/*
***********************************************************************************************
============================================倉庫元件===========================================
***********************************************************************************************
*/
var StorageFrameClass = Object.Extend(BaseViewClass);

StorageFrameClass.prototype.initialize=function(){
  this.base();
}

StorageFrameClass.prototype.create=function(){
  var self = this;
  this.bag = [];
	this.frame = $('#storage_frame');
  this.bag[settings.storageType.bag] = new StorageClass({
    type: settings.storageType.bag,
    frameName: 'bag_content',
    buttonName: '放置'
  });
  this.bag[settings.storageType.storage] = new StorageClass({
    type:settings.storageType.storage,
    frameName: 'storage_content',
    buttonName: '取出'
  });

  this.frame.bind("click",function(){self.click()});
  //this.storage_list.click(function (e){
     //e.stopPropagation();
  //});

  //this.bag_list.click(function (e){
     //e.stopPropagation();
  //});
}
StorageFrameClass.prototype.add = function(item){
  if (this.bag[item.storage])
    this.bag[item.storage].add(item);
}

StorageFrameClass.prototype.remove = function(itemID){
  for (var i in this.bag)
    this.bag[i].remove(itemID);
}

StorageFrameClass.prototype.reflush = function(){
  for (var i in this.bag)
    this.bag[i].reflush();
}

StorageFrameClass.prototype.click = function(){
  this.frame.fadeOut("fast");
}

StorageFrameClass.prototype.show= function(val,loginout){
  if (!this.frame.is(":visible")){
    this.frame.fadeIn("fast");
  }
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
  this.bag[settings.storageType.bag] = new StorageClass({
    type: settings.storageType.bag,
    frameName: 'bag_content2',
    buttonName: '裝備'
  });
  this.bag[settings.storageType.equipment] = new EquipmentClass({
    type:settings.storageType.equipment,
    frameName: 'equipment_content',
    buttonName: '取下'
  });

  this.frame.bind("click",function(){self.click()});
  $('[gid=bag]').on("click",function(){
    self.show();
  });
}
BagFrameClass.prototype.add = function(item){
  if (this.bag[item.storage])
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
