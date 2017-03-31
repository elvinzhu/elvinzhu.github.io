define( ['controller', 'ui/ui.datepicker'], function( BaseController, DatePicker ){
    
    
    var controller = BaseController.extend({
        
        run: function(data){
            
           this.init();
        }
        
    })

    var pt = controller.prototype;
    
    pt.init = function(){
        
    }
    
    pt.showPicker = function(e){
        
        var self = this;
        
        if(!this.picker){
            
            this.picker = new DatePicker({
                min: '1956-12-30',
                max: '1998-12-29',
                activeDate: '1998-12-29'
            });
            
            this.picker.on('done', function(e, year, month, day){
                
                self.$('#birth').val(year+'-'+month+'-'+day);
                console.log(arguments)
            })
        }
        
        this.picker.show()
    }
    
    return controller;
    
})