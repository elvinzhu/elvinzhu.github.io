define( ['controller', 'ui/ui.loadingbutton'], function( BaseController, LoadingButton ){
    
 
    var controller = BaseController.extend({
        
        run: function(data){
        
            this.init();
        }
        
    })

    var pt = controller.prototype;
    
    pt.init = function(){
        
        new LoadingButton(this.$('#btnSubmit'), function( setLoading, reset ){
                
            console.log(123123123);
            setLoading();
            setTimeout(function(){
                reset()
            }, 2000)
        })
        
        
//        new LoadingButton(this.$('#btnSubmit'), {
//            
//            loading_text: '提交中...',
//            callback: function( cb ){
//                
//                console.log(123123123);
//                setTimeout(function(){
//                    cb()
//                }, 2000)
//            }
//        })
    }
    
    return controller;
})