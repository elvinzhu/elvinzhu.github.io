define( ['controller'], function( BaseController ){
    
    
    var controller = BaseController.extend({
        
        run: function(data){
            
        }
        
    })

    var pt = controller.prototype;
    
    pt.showPicker = function(e){
        
        var self = this;
        if(!this.picker){
            
            Zero.showLoading();
            require(['ui/ui.alphapicker', 'data/airports'], function(AlphaPicker, Airports){
                
                Zero.hideLoading();
                self.picker = new AlphaPicker(Airports, {
                    onselect: function(data){
                        $(e.target).val(data.value).data('key', data.key)
                        // get whole data
                        console.log(this.getData(data.key))
                    },
                    header: true
                })
                
                self.picker.show()
            })
            
        }
        else{
            this.picker.show()
        }
    }
    
    return controller;
    
})