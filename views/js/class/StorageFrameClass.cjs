/*
***********************************************************************************************
============================================倉庫清單元件===========================================
***********************************************************************************************
*/
function StorageClass(data) {
  var self = this;

  this.storageType = data.storageType;
  this.frame = $('#'+data.frameName);
  this.buttonName = data.buttonName;

  if (typeof(data.click)==='function')
    this.click = data.click;
  this.limitLabel = this.frame.find('.storage_limit');
  this.itemList = this.frame.find('.itemList');

  this.filter = settings.equipmentType.weapon;

  this._limit = 0;
  
  this.fcount = {};
  for (var i in settings.equipmentType) {
    this.fcount[settings.equipmentType[i]] = 0;
  }
   
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
  this.items = {};
  for (var i in items){
    if (items[i].data.storage == this.storageType)
      this.items[i] = items[i];
  }
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
  
  for (var i in this.items) {
    this.fcount[this.items[i].base.type] += 1;
  }
  
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
  try {
    var _count = Object.keys(this.items).length;
    var _fcount = this.fcount[this.filter];
    this.limitLabel.html(_fcount + '/' + _count + '/' + this._limit);
  } catch (e){}
}

StorageClass.prototype.clear = function() {
  this.itemList.empty();
  this.limitLabel.empty();
}

/*
***********************************************************************************************
============================================裝備清單元件===========================================
***********************************************************************************************
*/
function EquipmentClass(data) {
  var self = this;

  this.storageType = data.storageType;
  this.frame = $('#'+data.frameName);
  this.buttonName = data.buttonName;
  this.infoEquip = $('#info_equip');

  this.limitLabel = this.frame.find('.storage_limit');
  this.itemList = this.frame.find('.itemList');
  this.showAttr = this.frame.find('#player_attr');

  this.itemList.on('click','btn',
    function (event) {
      event.stopPropagation();
      coms.item.emit('remove', $(this).attr('data'));
    });

  this.clear();
}

EquipmentClass.prototype.clear = function(equipmentType) {
  this.itemList.find('li').each(function(i){
    $(this).find('[gid=nam]').empty();
    $(this).find('[gid=attr]').empty();
    $(this).find('.number').empty();
    $(this).find('btn').hide();
  });
  this.infoEquip.find('li').each(function(i){
    $(this).find('[gid=nam]').html('(無)');
  });
}
EquipmentClass.prototype.reflushCount = function() {
  return;
}

EquipmentClass.prototype.reflush = function() {
  this.clear();
  this.data = {dmg:0,mag:0,def:0};
  this.items = {};
  for (var i in items){
    if (items[i].data.storage == this.storageType)
      this.items[i] = items[i];
  }
  for (var i in this.items) {
    var item = this.items[i];
    var _item = this.frame.find('[gid=equipmentType_'+item.base.type+']');
    _item.find('[gid=nam]').html('lv.' + item.data.level + item.base.nam);
    _item.find('[gid=attr]').html(tool.getAttr(item));
    //item.find('.number').html(item.nam.data.num);
    _item.find('btn').show();

    _infoItem = this.infoEquip.find('[gid=equipmentType_'+item.base.type+']');
    _infoItem.find('[gid=nam]').html('lv.' + item.data.level + item.base.nam);
    for (var i in this.data){
      this.data[i] += item[i];
    }
  }
  this.showAttr.html(tool.getAttr(this.data));
  o.chara.reflushBattleData();
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
    storageType: settings.storageType.bag,
    frameName: 'bag_content',
    buttonName: '放<br>置',
    click:function(data) {coms.item.emit('put', data)}
  });
  this.bag[settings.storageType.storage] = new StorageClass({
    storageType:settings.storageType.storage,
    frameName: 'storage_content',
    buttonName: '取<br>出',
    click:function(data) {coms.item.emit('get', data)}
  });

  this.frame.bind("click",function(){self.click()});

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
    storageType: settings.storageType.bag,
    frameName: 'bag_content2',
    buttonName: '裝<br>備',
    click:function(data) {coms.item.emit('equip', data)}
  });
  this.bag[settings.storageType.equipment] = new EquipmentClass({
    storageType:settings.storageType.equipment,
    frameName: 'equipment_content',
    buttonName: '取<br>下'
  });

  this.frame.bind("click",function(){self.click()});
  $('[gid=bag]').on("click",function(){
    self.show();
  });
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
