define( [ 'controller', 'ui/ui.swiper'], function( BaseController, Swiper){
    
    'use strict';
    
    var controller = BaseController.extend({
        
        run: function( data ){
            
            var swiper = new Swiper({
                srcDom: ".ui-swiper-container",
                prevButton: true,
                nextButton: true,
                startSlide: 0,
                pagination : "ui-swiper-pagination",
                loop: true,
                // autoPlay: 3,
                activate:function(e, to, from){
                    console.log("swiper"+e+"; "+"to"+to+"; "+"from"+from);
                }
            });

        }
    });
    
    var pt = controller.prototype;
    
    return controller;
})