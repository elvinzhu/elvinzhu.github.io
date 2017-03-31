define( [ 'controller', 'ui/ui.tabs'], function( BaseController , Tabs){
    
    'use strict';
    
    var controller = BaseController.extend({
        
        run: function( data ){
              
            var tabs1 = new Tabs({
                srcNode: this.$('#tabs1'),
                // initTab: "1",   //设置初始显示数量，默认0
                direction: "h",
                height:200,
                activate:function(e, to, from){
                    // console.log("tabs1"+e+"; "+to+"; "+from);
                },
                start:function(obj,to){

                    console.log(to);
                    console.log(obj);

                }
            });

            var tabs2 = new Tabs({
                srcNode: this.$('#tabs2'),
                initTab: "1",   //设置初始显示数量，默认0
                direction: "v",
                height: 300,
                scrollMove: true,
                activate:function(e, to, from){
                    console.log("tabs2"+e+"; "+to+"; "+from);
                },
                start:function(obj,to){

                    console.log(to);
                    console.log(obj);

                    
                }
            });

        }
    });
    
    var pt = controller.prototype;

    pt.moreWord = function(e,target){

        var self = this;

        var msg = "别玩了，好好看代码！";
        Zero.showToast(msg);

    }
    
    return controller;
})