/*
***********************************************************************************************
============================================城填元件===========================================
***********************************************************************************************
*/
var CityClass = Object.Extend(BaseViewClass);

CityClass.prototype.initialize=function(){
  this.base();
}
CityClass.prototype.updateInfo=function(){
  debug('Load City Frame Inforamtion');
  for (var c in publicData.builds) {
    var city = publicData.builds[c];
    var obj = $('#'+city.id+'_frame');
    //開發時不載入中文
    //obj.find('[gid=nam]').html(city.nam);
    //obj.find('[gid=desc]').html(city.desc);
  }
}
CityClass.prototype.create=function(){
  var self = this;
  this.frame = $('#city_frame');
  this.content = $('.city_content','#city_frame');
  this.nam = this.gid('nam');
  this.desc = this.gid('desc');
  

  live('.city_button',{
    click:function (event) {
      self.city($(this));
    }
  });
  this.updateInfo();
}

