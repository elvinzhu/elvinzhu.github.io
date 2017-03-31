define( [ 'controller' ], function( BaseController ){
    
    'use strict';
    
    
    var controller = BaseController.extend({
        
        run: function( data ){
            // 基础组件除了可以使用框架预实例化的之外还可以自己实例化
        }
        
    });
    
    var pt = controller.prototype;
    
  
    return controller;
})