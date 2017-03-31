define( [ 'controller', 'ui/ui.calendar'], function( BaseController, Calendar ){
    
    'use strict';
    
    var controller = BaseController.extend({
        
        run: function( data ){
              
            var self = this, now = new Date();
            this.calTakeoff = new Calendar({
                minDate: now,      // 需要去除时间
                //minDate: Calendar.format(new Date()), // 转成这种格式 '2016-07-29'
                //days: 3,  // 可选
                //activeDate: '2016-08-8',// 可选
                months: 6,// 可选
                //maxDate: new Date(now.setMonth(now.getMonth()+6)),// 可选
                select: function( date ){
                    self.$('#date').val(date);
                    this.hide();
                },
                header: true
            });
            
            // 参数优先级  maxDate > days > months 默认 显示6个月
            
            this.$('#date').on('focus', function(e){
                
                self.calTakeoff.show();
            })
        }
        
    });
    
    var pt = controller.prototype;
    
    pt.showCalendar = function(e){
        
        this.calTakeoff.show();
    }
    
    return controller;
})