/*
***********************************************************************************************
============================================倉庫清單元件===========================================
***********************************************************************************************
*/
function StorageClass(data) {
  this.type = data.storageType;
  this.frame = $('#'+data.frameName);
  this.buttonName = data.buttonName;

  this.limitLabel = this.frame.find('.storage_limit');
  this.itemList = this.frame.find('.itemList');

  this._limit = 0;
  this.items = {};
  this.itemList.on('click','btn',
    function (event) {
      console.log('test');
      coms.item.emit('move', $(this).attr('data'));
      event.stopPropagation();
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

StorageClass.prototype.reflushLimit = function() {
  var _count = Object.keys(this.items).length;
  this.limitLabel.html(_count + '/' + this._limit);
}

StorageClass.prototype.add = function(item) {
  if (!this.items[item.id]) {
  this.itemList.append('<li id="item'+item.id+'">'+
            '<div class="label" gid="nam"></div>'+
            '<div gid="attr"></div>'+
            '<div class="number" gid="coins"></div>'+
            '<btn class="StorageButton">'+this.buttonName+'</btn>'+
            '</li>');
  }
  this.items[item.id] = item;
  var _obj = this.itemList.find('#item'+item.id);
  this.setItem(_obj, item);
  this.reflushLimit();
}

StorageClass.prototype.clear = function() {
  this.itemList.empty();
  this.reflushLimit();
}

StorageClass.prototype.setItem = function(obj, data) {
  var _item = db.items[data.baseID];
  obj.find('[gid="nam"]').html('lv.'+data.level+_item.nam);
  obj.find('[gid="attr"]').html(JSON.stringify(_item.data));
  obj.find('[gid="coins"]').html('x'+data.num);
  obj.find('btn').attr('data', data.id);
}

StorageClass.prototype.remove = function(itemID) {
  delete this.items[itemID];
  this.itemList.find('#item'+itemID).remove();
  this.reflushLimit();
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
    buttonName: '置'
  });
  this.bag[settings.storageType.storage] = new StorageClass({
    type:settings.storageType.storage,
    frameName: 'storage_content',
    buttonName: '取'
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
  this.bag[item.storage].add(item);
}

StorageFrameClass.prototype.remove = function(itemID){
  for (var i in this.bag)
    this.bag[i].remove(itemID);
}

StorageFrameClass.prototype.click = function(){
  this.frame.fadeOut("fast");
}

StorageFrameClass.prototype.show= function(val,loginout){
  if (!this.frame.is(":visible")){
    this.frame.fadeIn("fast");
  }
}
