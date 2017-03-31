define( [ 'controller', 'tool/share'], function( BaseController, Share){
    
    'use strict';
    
//    隐藏右上角菜单
//    Share.wx.hideOptionMenu();
    
    var controller = BaseController.extend({
        
        run: function( data ){
            
            Share.set({
                link: location.href,
                title: '珍惜眼前，常回家看看！',
                desc: '我们都在犯一个错，人生其实并没有来日方长',
                richTitle: '珍惜眼前，常回家看看！我们都在犯一个错，人生其实并没有来日方长',
                imgUrl: 'http://static.zhongan.com/website/other/html/spring/images/share.jpg',
                success: function(ret){
                    alert("成功:"+JSON.stringify(ret))
                },
                cancel: function(ret){
                    alert("失败:"+JSON.stringify(ret))
                }
            })
            
            // 显示右上角菜单
            // Share.wx.showOptionMenu    
        }
    });
    
    var pt = controller.prototype;
    
    return controller;
})