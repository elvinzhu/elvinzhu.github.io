define( ['controller'], function( BaseController ){
    
    
    var controller = BaseController.extend({
        
        run: function(data){
        
            this.init();
        }
        
    })

    var pt = controller.prototype;
    
    pt.init = function(){
        
        var self = this;
        
        // 非必须功能，建议延后加载
        require(['ui/ui.inputclear'], function(InputClear){
            new InputClear(self.$('input'));
        })
    }
    
    return controller;
    
})