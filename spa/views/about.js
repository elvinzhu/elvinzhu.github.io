define( ['controller', 'text!../templates/about.html'], function( BaseController, Html ){
    
    var controller = BaseController.extend({
        
        onCreate: function(){
            
            this.$el.html(Html)
        },
        
        onShow: function(){
            
            
        },
        
        onHide: function(){
            
            
        }
        
    })
    
    
    var pt = controller.prototype;
    
    return controller;
    
})