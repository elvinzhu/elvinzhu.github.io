define( ['controller', 'ui/ui.scroll'], function( BaseController, Scroll ){
    
    
    var controller = BaseController.extend({
        
        run: function(data){
            
            this.init()
        }
        
    })

    var pt = controller.prototype;
    
    pt.init = function(){
        
        this.h = new Scroll( this.$('.wraper'), {
            direction: 'h',
            width : 0, // 滚动显示宽度， 默认容器宽度
            height: 0, // 滚动显示高度， 默认容器高度
            deceleration: 0.2, // 滚动减速度, 默认 0.2
            cancelTouchMove: true // 默认 true。 是否阻止touchmove事件冒泡
        })
        
        this.v = new Scroll( this.$('.wraper2'), {
            
            direction: 'v'
        })
    }
    
    pt.animateTo = function(e, dest, timingfnc, duration){
        
        this.h.animateTo(dest, timingfnc, duration)
    }
    
    
    return controller;
    
})