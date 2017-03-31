define( [ 'controller', 'tool/form'], function( BaseController, Form ){
    
    'use strict';
    
    var controller = BaseController.extend({
        
        run: function( data ){
            
            this.Model = new Form.ViewModel(this);
            
            this.Model.on('change', function(data){
                
                console.log('============ change ==============')
                console.log(data)
            }).on('error', function(ev){
                
                Zero.showToast(ev.msg)
                console.log('============ error ==============')
                console.log(ev)
            })
            
//            // 添加到Model上，仅改Model能使用
//            this.Model.Rules.add('custom_rule', function(el, value, label, errormsg, ruleValue){
//                
                  // return 'default'; // 等同于 "请正确填写页面信息"
//                return "找到 custom-rule 了, 在model里面";
//            })
//            // 添加到全局上，所有Model都可用
//            Form.Rules.add('custom_rule', function(el, value, label, errormsg, ruleValue){
//                
                  // return 'default'; // 等同于 "请正确填写页面信息"
//                return "找到 custom-rule 了, 在Rules里面";
//            })
        }
        
    });
    
    var pt = controller.prototype;
    
    pt.output =function(e){
        
        console.log('============ output ==============')
        for(var key in this.Model){
            
            if(typeof this.Model[key] != 'function' && '$els,controller,container,config,debug'.indexOf(key)===-1){
                console.log(key, ':', this.Model[key])
            }
        }
    }
    
    pt.modify = function(e){
        
        this.Model.name = '马上飞_1';
        this.Model.age  = 10;
        this.Model.displayName = '小马哥_1';
        this.Model.gender = '女';
        this.Model.money = 0.111111; // fixed.write filter 会只保留两位小数
        this.Model.birthday = '2015/02/02'; // formatDate.write filter 会将日期格式转成成 yyyy-MM-dd 格式
    }
    
    pt.clone = function(e){
        
        console.log('============ clone ==============');
        console.log(this.Model.clone())
    }
    
    pt.cloneForm = function(e){
        
        console.log('============ cloneForm ==============');
        console.log(this.Model.cloneForm())
    }
    
    pt.valid = function(e){
        
        if(this.Model.valid()){
            
            Zero.showToast('验证通过')
        }
    }
    
    pt.valid2 = function(e){
        
        if(this.Model.valid(['name','age'])){
            
            Zero.showToast('验证通过')
        }
    }
    
    pt.validAll = function(e){
        
        if(this.Model.validAll()){
            
            Zero.showToast('验证通过')
        }
    }
    
    pt.isValid = function(e){
        
        Zero.showToast('isValid: ' + this.Model.isValid())
    }
    
    pt.isValidP = function(e){
        
        Zero.showToast('isValid: ' + this.Model.isValid('postcode'))
    }
    
    pt.selectHobby = function(e){
        
        var $target = $(e.currentTarget);
        $target.find('i').toggleClass('checked');
        
        var val = '';
        $target.parent().find('.checked').each(function(idx, item){
            val += (val.length ? ',': '') + item.getAttribute('value')
        })
        
        this.Model.hobby = val;
    }
    
    return controller;
})