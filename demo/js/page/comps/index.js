define( [ 'ui-toast', 'controller' ], function( Toast, BaseController ){
    
    'use strict';
    
    // 一些不操作DOM的，给一个输入出一个输出的函数可以定义在外面
    function func1 ( data ){
        
        var temp = data;
        
        // do something here.
        
        return temp;
    }
    
    var controller = BaseController.extend({
        
        run: function( data ){
              
            // 基础组件除了可以使用框架预实例化的之外还可以自己实例化
            //var myToast = new Toast();
            //myToast.show( '基础组件除了可以使用框架预实例化的之外还可以自己实例化', 2 );

            this.bindEvent();
            this.getData(); // for demo popurse
            
            func1( 'demo' );
        },
        
        // 函数可以在这里添加到 controller 里面
        // event-src="showToast1"
        showToast1: function( e ){
            Zero.showToast( '我是Toast', 2 , function(){
                // alert( 'auto closed' );
            });
        },
        
        showToast2: function( e ){
            Zero.showResult('操作成功', {interval: 500})
        }
    });
    
    var pt = controller.prototype;
    
    // 函数也可以通过这种方式添加到 controller 里面
    pt.bindEvent = function(){
        
        // 传统方式绑定事件
        this.$el.on('tap', 'button.toggle',function( e ){
            $(this).parent().next().toggle();
        })
    };
    
    
    pt.getData = function( ){
        
        //        $.ajax({
        //            type: 'GEtT',
        //            url : ''
        //        });
    };
    
    pt.showConfirm1 = function( e ){
        
        Zero.showConfirm( '没中奖哦！再接再厉！<br>您今天还可以参加<span class="red">2</span>次抽奖' , {
            ok:{
                callback: function(){
                    this.hide();
                }
            }
        });    
    };
    
    pt.showConfirm2 = function( e ){
        
         Zero.showConfirm( '我是Confirm', {
            cancel:{ 
                text:  'cancel',
                callback: function(){
                    this.hide();
                }
            },
            ok:{
                text: 'ok',
                callback: function(){
                    this.hide();
                }
            },
            // optional
            btns:[
                {
                    text: 'Go',
                    callback: function(){
                        this.hide();
                    }
                }
            ]
        } );
    };  
    
    pt.showConfirm3 = function( e ){
        
        Zero.showConfirm( '我是Confirm', {
            ok: false, // 注意这里是 false
            cancel:{
                text:'好',
                callback: function(){
                    this.hide();
                }
            }
        });
    };
    
    pt.showConfirm4 = function( e ){
        
        Zero.showConfirm( '支付<span class="red">10</span>积分兑换一次抽奖机会。确认支付后，将直接从您的账户扣除积分', {
            title: "确认支付",
            ok: false, // 注意这里是 false
            cancel:{
                text:'好',
                callback: function(){
                    this.hide();
                }
            }
        });
    }
    
    pt.showLoading1 = function( e ){
        Zero.showLoading('玩儿命加载中...');
    }
    
    pt.showMask = function(){
        
        Zero.showMask({
            touchHide:true, // 点击隐藏，
            callback:function( ){
                Zero.showToast('Hi there！<br>You clicked me.');
            }
        });
    }
    
    return controller;
})