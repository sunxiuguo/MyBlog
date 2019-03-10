// 重写EventListener相关方法 
// 监听element.addEventListener添加的事件,以及element.onclick添加的事件

(function() {
    'use strict';
    console.log('enter custom Event')

    // 存放原有方法
    Element.prototype._addEventListener = Element.prototype.addEventListener;
    Element.prototype._removeEventListener = Element.prototype.removeEventListener;

    /**
     * 重写的addEventListener
     * @param {[type]}  type       事件类型
     * @param {[type]}  listener   事件回调
     * @param {Boolean} useCapture 是否在捕获阶段执行 默认false
     */
    Element.prototype.addEventListener = function(type,listener,useCapture=false) {
        console.log(type)
        console.log(listener)
        // 添加监听事件
        this._addEventListener(type,listener,useCapture);

        if(!this.eventListenerList) this.eventListenerList = {};
        if(!this.eventListenerList[type]) this.eventListenerList[type] = [];

        // eventListenerList中记录此监听事件
        this.eventListenerList[type].push( {type, listener, useCapture} );
    };

    /**
     * 重写的removeEventListener
     * @param {[type]}  type       事件类型
     * @param {[type]}  listener   事件回调
     * @param {Boolean} useCapture 是否在捕获阶段执行 默认false
     */
    Element.prototype.removeEventListener = function(type,listener,useCapture=false) {
        // 移除监听事件
        this._removeEventListener(type,listener,useCapture);

        if(!this.eventListenerList) this.eventListenerList = {};
        if(!this.eventListenerList[type]) this.eventListenerList[type] = [];

        for(let i=0; i<this.eventListenerList[type].length; i++){
            if( this.eventListenerList[type][i].listener===listener && this.eventListenerList[type][i].useCapture===useCapture){
                this.eventListenerList[type].splice(i, 1);
                break;
            }
        }
        
        if(this.eventListenerList[type].length==0) delete this.eventListenerList[type];
    };


    /**
     * 获取事件列表
     * @param  {[type]} type 事件类型
     */
    Element.prototype.getEventListeners = function(type){
        if(!this.eventListenerList) this.eventListenerList = {};

        // 如果不指定type, 返回所有事件列表
        if(type===undefined)  return this.eventListenerList;
        return this.eventListenerList[type];
    };


    
    Element.prototype.clearEventListeners = function(a){
        if(!this.eventListenerList)
            this.eventListenerList = {};
        if(a==undefined){
            for(var x in (this.getEventListeners())) this.clearEventListeners(x);
            return;
        }
        var el = this.getEventListeners(a);
        if(el==undefined)
            return;
        for(var i = el.length - 1; i >= 0; --i) {
            var ev = el[i];
            this.removeEventListener(a, ev.listener, ev.useCapture);
        }
    };

    // HTMLElement.onclick方式挂载的监听事件
    Object.defineProperty(HTMLElement.prototype, 'onclick', {
        set: function (value) {
            this.addEventListener('click', value);   
        }
    })
    

})();
