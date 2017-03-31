define( [ 'controller', 'ui/ui.slider' ], function( BaseController, Slider ){
    
    'use strict';
    
    var controller = BaseController.extend({
        
        run: function( data ){

            this.init();
        }
        
    });
    
    var pt = controller.prototype;
    
    pt.init = function( ){
        this.slider = new Slider({
			$container: this.$('.template-wrap'),
			afterSwitch: function (data) {
                console.log(data.index);
			}
        })
    };
    
    return controller;
})