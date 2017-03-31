define( [ 'controller', 'ui/ui.number'], function( BaseController, UINumber ){
    
    'use strict';
    
    var controller = BaseController.extend({
        
        run: function( data ){
              
            this.quantity = new UINumber({
                canEdit: true,
                el: this.$('#buyCount'),
                min: 1,
                max: 1,
                onchange: function( data ){
                    
                    console.log(data);
                    
                    // 修改数量
                    // data.value = 444;
                    
                    /* 下面代码可取消用户此次的点击 */
                    // return false;
                },
                change: function( data ){
                    
                    console.log(data);
                }
            })
            
//            this.quantity.set('max', 20);
//            this.quantity.set('min', 20);
            
            // or 
            this.quantity.set({
                max: 20,
                min: 5
            })
            
            this.quantity.val(21);
        }
        
    });
    
    var pt = controller.prototype;
    
    return controller;
})