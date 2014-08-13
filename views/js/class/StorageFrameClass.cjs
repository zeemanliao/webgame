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

  if (typeof(data.click)==='function')
    this.click = data.click;
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
      if (typeof(self.click)==='function')      
        self.click($(this).attr('data'));
    });

  this.frame.on('click','radio',
    function (event){
      event.stopPropagation();
      tool.selectEvent($(this));
      
      self.filter = $(this).attr('data');
      self.reflush();
    });
  tool.selectEvent(this.frame.find('radio[data="1"]'));
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
  this.reflushCount();
});

StorageClass.prototype.reflush = function() {
  this.clear();

  for (var i in this.items){
    var item = this.items[i];
    if (item.base.type == this.filter)
    this.itemList.append('<li id="item'+item.id+'">'+
              '<div class="label" gid="nam">'+'lv.'+item.data.level+item.base.nam+'</div>'+
              '<div gid="attr">'+tool.getAttr(item)+'</div>'+
              '<div class="number" gid="coins">x'+item.data.num+'</div>'+
              '<btn class="StorageButton" data="'+item.id+'">'+this.buttonName+'</btn>'+
              '</li>');
  }
  this.reflushLimit();
}

StorageClass.prototype.reflushLimit = function(){
  
  var self = this;
  for (var i in this.fcount)
    this.fcount[i] = 0;
  
  for (var i in this.items)
    this.fcount[this.items[i].base.type] += 1;
  
  for (var i in this.fcount){
    this.frame.find('.selectType').each(function(index){
      var _cnt = self.fcount[$(this).attr('data')];
      _cnt = _cnt !=0 ? _cnt:'';
      $(this).find('.itemCount').html(_cnt);
    });
  }
  this.reflushCount();
  
}

StorageClass.prototype.reflushCount = function(){
  var _count = Object.keys(this.items).length;
  var _fcount = this.fcount[this.filter];
  this.limitLabel.html(_fcount + '/' + _count + '/' + this._limit);
}

StorageClass.prototype.add = function(data) {
  //item.base = publicData.items[item.baseID];
  this.items[data.id] = new Item(data);
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
============================================裝備清單元件===========================================
***********************************************************************************************
*/
function EquipmentClass(data) {
  var self = this;

  this.type = data.storageType;
  this.frame = $('#'+data.frameName);
  this.buttonName = data.buttonName;

  this.limitLabel = this.frame.find('.storage_limit');
  this.itemList = this.frame.find('.itemList');
  this.showAttr = this.frame.find('#player_attr');
  this.items = {};

  this.itemList.on('click','btn',
    function (event) {
      event.stopPropagation();
      coms.item.emit('remove', $(this).attr('data'));
    });

  this.clear();
}


EquipmentClass.prototype.add = function(data) {
  this.items[data.id] = new Item(data);
}

EquipmentClass.prototype.clear = function(equipmentType) {
  this.itemList.find('li').each(function(i){
    $(this).find('[gid=nam]').empty();
    $(this).find('[gid=attr]').empty();
    $(this).find('.number').empty();
    $(this).find('btn').hide();
  });
}
EquipmentClass.prototype.reflushCount = function() {
  return;
}

EquipmentClass.prototype.reflush = function() {
  this.clear();
  this.data = {dmg:0,mag:0,def:0};
  for (var i in this.items) {
    var item = this.items[i];
    var _item = this.frame.find('[gid=equipmentType_'+item.base.type+']');
    _item.find('[gid=nam]').html('lv.' + item.data.level + item.base.nam);
    _item.find('[gid=attr]').html(tool.getAttr(item));
    //item.find('.number').html(item.nam.data.num);
    _item.find('btn').show();

    for (var i in this.data){
      this.data[i] += item[i];
    }
  }
  this.showAttr.html(tool.getAttr(this.data));
  o.chara.reflushBattleData();
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
    buttonName: '放<br>置',
    click:function(data) {coms.item.emit('move', data)}
  });
  this.bag[settings.storageType.storage] = new StorageClass({
    type:settings.storageType.storage,
    frameName: 'storage_content',
    buttonName: '取<br>出',
    click:function(data) {coms.item.emit('move', data)}
  });

  this.frame.bind("click",function(){self.click()});
  //this.storage_list.click(function (e){
     //e.stopPropagation();
  //});

  //this.bag_list.click(function (e){
     //e.stopPropagation();
  //});
}
StorageFrameClass.prototype.add = function(data){
  if (this.bag[data.storage])
    this.bag[data.storage].add(data);
}

StorageFrameClass.prototype.remove = function(itemID){
  for (var i in this.bag)
    this.bag[i].remove(itemID);
}

StorageFrameClass.prototype.reflush = function(){
  for (var i in this.bag)
    this.bag[i].reflush();
}

StorageFrameClass.prototype.reflushCount = function() {
  for (var i in this.bag)
    this.bag[i].reflushCount(); 
}

StorageFrameClass.prototype.click = function(){
  this.frame.fadeOut("fast");
}

StorageFrameClass.prototype.show= function(val,loginout){
  if (!this.frame.is(":visible")){
    this.frame.fadeIn("fast");
  }
}

StorageFrameClass.prototype.__defineGetter__("items", function(){
  var items = {};
  for (var i in this.bag) {
    for (var j in this.bag[i].items)
      items[j] = this.bag[i].items[j];
  }
  return items;
});

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
    buttonName: '裝<br>備',
    click:function(data) {coms.item.emit('equip', data)}
  });
  this.bag[settings.storageType.equipment] = new EquipmentClass({
    type:settings.storageType.equipment,
    frameName: 'equipment_content',
    buttonName: '取<br>下'
  });

  this.frame.bind("click",function(){self.click()});
  $('[gid=bag]').on("click",function(){
    self.show();
  });
}
BagFrameClass.prototype.add = function(data){
  if (this.bag[data.storage]) 
    this.bag[data.storage].add(data);
}

BagFrameClass.prototype.remove = function(itemID){
  for (var i in this.bag)
    this.bag[i].remove(itemID);
}

BagFrameClass.prototype.reflush = function(){
  for (var i in this.bag)
    this.bag[i].reflush();
}

BagFrameClass.prototype.reflushCount = function() {
  for (var i in this.bag)
    this.bag[i].reflushCount(); 
}

BagFrameClass.prototype.click = function(){
  this.frame.fadeOut("fast");
}

BagFrameClass.prototype.show= function(val,loginout){
  if (!this.frame.is(":visible")){
    this.frame.fadeIn("fast");
  }
}
