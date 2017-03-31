define( [ 'controller' , 'ui/ui.lazyload' , 'ui/ui.tabs'], function( BaseController , Lazyload , Tabs ){
    
    'use strict';
    
    var controller = BaseController.extend({
        
        run: function( data ){
            
        	var tabs1 = new Tabs({
                srcNode: this.$('#tabs1'),
                initTab: "0",   //设置初始显示数量，默认0
                direction: "h",
                height: "auto",
                activate:function(e, to, from){
                    console.log("tabs1"+e+"; "+to+"; "+from);
                }
            });

            var lazyload = new Lazyload({element:".lazy"});

        }
    });
    
    var pt = controller.prototype;
    
    return controller;
})