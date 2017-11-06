define( [ 'controller' ], function( BaseController ){

    'use strict';
    
    var controller = BaseController.extend({
        
        run: function( data ){
            
            this.$('#txtTpl').text(this.$('#demoTpl').text().trim())
            this.render();
        }
        
    });
    
    var pt = controller.prototype;
    
    pt.render  = function(e){
        
        var $result = this.$('#result').html('error');
        
        var data = this.readData();
        var html = this.T('#demoTpl', data);
        
        html && setTimeout(function(){
             $result.html(html)
        },50)
    }
    
    pt.readData = function(){
        return eval('1,'+this.$('#data').val().trim())
    }
    
    return controller;
})