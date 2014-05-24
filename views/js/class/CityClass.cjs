/*
***********************************************************************************************
============================================城填元件===========================================
***********************************************************************************************
*/
var CityClass = Object.Extend(BaseViewClass);

CityClass.prototype.initialize=function(){
  this.base();
}
CityClass.prototype.create=function(){
  var self = this;
  this.frame = $('#city_frame');
  this.content = $('.city_content','#city_frame');
  //alert(this.frame.attr('id'));
 $('.city_button').live({
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
           50,
           null,
           function(){
             self.goto($(this).attr("data"));
           }
         );
      }
  });
}

