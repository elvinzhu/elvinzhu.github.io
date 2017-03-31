define( [ 'controller' ], function( BaseController ){
    
    'use strict';
    
    
    var controller = BaseController.extend({
        
        run: function( data ){
          
            var id = this.getHash();
            if(id){
                var $cnchor = this.$('#'+id);
                if($cnchor.length){
                    document.body.scrollTop = $cnchor.offset().top - 50;
                }
            }
        },
        
        events: {
            'blur|#textTest1': 'onblur'
        },
        
        test: function( e ){
            
            Zero.showToast( 'Parent clicked!' );
        },
        
        test1: function( e ){
            
            Zero.showToast( 'Child clicked!' );
        }
        
    });
    
    var pt = controller.prototype;
    
    pt.clickMe1 = function( e ){
        
        Zero.showToast('worked!')
    }
    
    pt.clickMe2 = function( e, id ){
        
        Zero.showToast('参数：'+id)
    }
    pt.clickMe3 = function( e, id, p ){
        
        Zero.showToast('参数：'+id + '<br>'+p)
    }
    
    pt.onblur = function(e){
        
        Zero.showToast('blur')
    }
    
    return controller;
})