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
  for (var c in db.builds) {
    var city = db.builds[c];
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
  
  live('btn',{
    mouseenter: function() {       
      $(this).delay(0).animate({opacity:'1'},50);
    },
    mouseleave: function() {
      $(this).delay(0).animate({opacity:'0.6'},50);
    },
    click:function (event) {
        event.preventDefault();
        
        $(this).delay(0).animate(
          {
            width: $(this).width()+10,
            height: $(this).height()+10,
            top: $(this).position().top-5,
            left: $(this).position().left-5
          }
          ,50
          );
       $(this).delay(0).animate(
           {
              width: $(this).width(),
              height: $(this).height(),
              top: $(this).position().top,
              left: $(this).position().left
            },
           50
         );
      }
  });
  live('.city_button',{
    click:function (event) {
      self.city($(this));
    }
  });
  this.updateInfo();
}

