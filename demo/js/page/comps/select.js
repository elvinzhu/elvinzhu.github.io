define( [ 'controller', 'ui/ui.select', '/js/common/data-area.js'], function( BaseController, Select, AreaData ){
    
    'use strict';
    
    var controller = BaseController.extend({
        
        run: function( data ){
              
            var ddl0 = new Select(AreaData, {
                columns: 1,
                title: '旅游目的地'
            });

            var ddl1 = new Select(AreaData, {
                columns: 2
            });

            var ddl2 = new Select(AreaData, {
                columns: 3
            });

            ddl2.setValue(2,3,4)

            
            var self = this;
            ddl0.on('done', function(e, val1){
                self.$('#valueArea').text(JSON.stringify(val1));
            })

            ddl1.on('done', function(e, val1, val2){
                self.$('#valueArea').text(JSON.stringify([val1,val2]));
            })

            ddl2.on('done', function(e, val1, val2, val3){
                self.$('#valueArea').text(JSON.stringify([val1,val2,val3]));
            })
            
            this.ddl0 = ddl0;
            this.ddl1 = ddl1;
            this.ddl2 = ddl2;

        }
    });
    
    var pt = controller.prototype;
    
    pt.showSelect = function(e, type){
        
        this['ddl'+type].show();
    }
    
    return controller;
})