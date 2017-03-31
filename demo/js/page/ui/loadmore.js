define( ['controller', 'ui/ui.loadmore'], function( BaseController, LoadMore ){
    
    
    var controller = BaseController.extend({
        
        run: function(data){
        
            this.init();
        }
        
    })

    var pt = controller.prototype;
    
    pt.init = function(){
        
        var self =this;
        this.loadMore = new LoadMore( {
//            mode: 'scroll',
            container: this.$('#loadmore'),
            beforeLoad: function(ajax_options){
                
//                console.log(ajax_options);
//                    ajax_options.data = {}; // 可以在这里修改提交数据  默认：{page_size:[int] ,page_index: [int]}
            },
            afterLoad: function(data){
                
//                console.log(data);
                self.appendHtml(data.data)
                return data.data.length; // return  -1： 不增加页码数; < pagesize: 所有数据加载完毕;  >= page size: 页码 +1
            },
            pageSize: 10,
            page: 0,
            url: '/demo/fakeapi/list.json',
            method: 'GET' // 默认 POST
//                type: ''       // white: 白色的loading图标， 默认蓝色loading图标
        })

        this.loadMore.load();
    }
    
    pt.appendHtml = function(data){
        
        var html = this.T('#tpl', data);
        this.$('#box').append(html);
    }
    
    return controller;
    
})