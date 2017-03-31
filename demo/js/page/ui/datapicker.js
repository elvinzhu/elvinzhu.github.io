define( ['controller'], function( BaseController ){
    
    var CARD_TYPE_DATA = {
        title: '请选择证件类型',
        current: 27,
        data:[{
            key: 1,
            name: "身份证"
        }, {
            key: 2,
            name: "护照"
        }, {
            key: 8,
            name: "台胞证"
        }, {
            key: 7,
            name: "回乡证"
        }, {
            key: 4,
            name: "军人证"
        }, {
            key: 10,
            name: "港澳通行证"
        }, {
            key: 22,
            name: "台湾通行证"
        }, {
            key: 25,
            name: "户口簿"
        }, {
            key: 27,
            name: "出生证明"
        }, {
            key: 99,
            name: "其他"
        }]
    };
    
    var controller = BaseController.extend({
        
        run: function(data){
            
        },
        
        card_type_data: CARD_TYPE_DATA
        
    })

    var pt = controller.prototype;
    
    
    pt.showPicker = function(e){
        
        if(!this.picker){
            
            var self = this;
            
            Zero.showLoading();
            require(['ui/ui.datapicker'], function(DataPicker){
                
                self.picker = new DataPicker(self.card_type_data);
                self.picker.on('change', function(data){

                    self.$('#cardtype').val(data.name)
                    console.log(data)
                }).show();
                
                Zero.hideLoading();
            })
        }
        else{
            
            this.picker.show()
        }
        
    }
    
    return controller;
    
})