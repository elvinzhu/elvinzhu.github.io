
// 这里可以配置项目需要的模块
requirejs.config({
    paths: {
        'module name': 'module path'
    }
})

// 方式1：
define( 'common', [ 'tool/router' ],  function( Router ){
    
    var common = {};
    
    console.log('inner common')
    
    common.demo = function(){
        
    }
    
    Router.on('shown', function(controller){
        console.log(controller.page_id)
    })
    
    return common;
    
});


// 方式2：
var DemoComm = {
    
    reloador: function(){
        //$(document.body).append('<div class="white" style="width:40px;height:40px;border-radius:50%;position:fixed; top:53px;right:5px;background-color:rgba(0, 128, 0,0.3);text-align:center;line-height:40px;z-index:100000000" onclick="location.reload(true)">刷</div>')
    }
};

DemoComm.reloador();


/*

============= 注意点：  ==================

1. 方式1中 common 模块不会自动执行（requirejs加载机制问题）即console不会打印出 'inner common'， 但是你controller中如果依赖了 'common', 则会正常执行
2. 不要尝试 自己配置 common 短路径，然后方式1中使用匿名模块(如下代码所示)，然后你controler依赖'common', requirejs在这种情况下有bug

    requirejs.config({
        paths: {
            'common': '/js/page/common'
        }
    });

    define(function(){
    
        var common = {};
        console.log('inner common')

        common.demo = function(){

        }

        return common;
    });

3. 

*/

