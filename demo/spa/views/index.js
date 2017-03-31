define( ['controller', 'text!../templates/index.html'], function( BaseController, Html ){
    
    var controller = BaseController.extend({
        
        onCreate: function(data){
            
            console.log(data)
            this.$el.html(Html);
            
            console.log('onCreate')
        },
        
        onShow: function(){
            
            console.log('onShow')
        },
        
        onHide: function(){
            
            console.log('onHide')
        }
        
    })
    
    
    var pt = controller.prototype;
    
    return controller;
    
})