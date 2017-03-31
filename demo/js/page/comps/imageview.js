define( [ 'controller', 'tool/imagemin', 'ui/ui.imageview' ], function( BaseController, Imagemin, ImageView ){
    
    'use strict';
    
    var controller = BaseController.extend({
        
        run: function( data ){
             
            var self = this;
            this.$('.upload-box input[type=file]').on('change', function(e){
                self.loadImg(this)
            })
        }
        
    });
    
    var pt = controller.prototype;
    
    pt.deleteImg = function( e ){
        
        $(e.currentTarget)
            .parent()
            .removeClass('preview')
            .find('img')
            .attr('src','');
    }
    
    pt.previewUploads = function( e ){
        
        var $previews = this.$('.preview'),
            data = _.map($previews, function(div){
                var img = div.querySelector('img');
                return {
                    src: img.src,
                    des: ''
                }
            });
        
        if( !this.imageView ){
            this.imageView = new ImageView()
        }
        
        this.imageView.show(data, {
            current: $previews.indexOf(e.currentTarget.parentNode),
            header: true
        });
    }
    
    pt.loadImg = function( fileEl ){
            
        Zero.showLoading();
        
        var self = this;
        Imagemin.readFile(fileEl, function( result ){
            
            if( result == 'no file' ){
                Zero.hideLoading();
                return;
            }

            var img = new Image();
            img.onload = function(){
                
                Zero.hideLoading();
                var compressed = Imagemin.compressWithRatio(this, {
                    maxWidth: 800,
                    maxHeight: 800
                })
                
                self.preview(fileEl, compressed);
            }

            img.src = result;
        })
    }
    
    pt.preview = function(fileEl, result){
        
        var $file = $( fileEl );
        $file.next('img')[0].src = result;
        $file.parent().addClass('preview');
    }
    
    pt.showImgs = function(e){
        
        var data = [{
            src: '/images/page/test/2.jpg',
            des: '我的女神赵丽颖'
        },{
            src: '/images/page/test/3.jpg',
            des: '风景'
        },{
            src: '/images/page/test/1.jpg',
            des: 'dgf'
        }];
        
        if(!this.imgView){
            this.imgView = new ImageView(data, {
                header: true,
                afterSwitch: function(data){
                    console.log(data)
                }
            })
        }
        
        this.imgView.show();
    }
    
    return controller;
})