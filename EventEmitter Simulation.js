//初始化Event,设置Event的事件清单和监听者上限
class EventEmeitter {
    constructor() {
        //todo Map Set
      this._events = this._events || new Map(); // 储存{事件：回调}键值对
      this._maxListeners = this._maxListeners || 10; // 设立监听上限
    }
}

//触发type类型的事件
EventEmeitter.prototype.emit = function (type,...args){
    let handler;
    //从存储的Map键值对this._events中获取对应事件回调函数
    handler = this._events.get(type);
    if(Array.isArray(handler)){
        //多个监听者
        for(let i=0;i<handler.length;i++){
            if(args.length>0){
                handler[i].apply(this,args)
            }else{
                handler[i].call(this)
            }
        }
    }else{
        //一个监听者
        if(args.length>0){
            handler.apply(this,args)
        }else{
            handler.call(this)
        }
    }
    
    return true;
}

//监听type类型的事件
EventEmeitter.prototype.addListener = function(type,fn){
    const handler = this._events.get(type);
    
    if(!handler){
        this._events.set(type,fn)
    }else if(handler && typeof handler === "function"){
        //hanlder为函数，说明只有一个监听者
        //多个监听者用数组存储
        this._events.set(type,[handler,fn])
    }else{
        //已有多个监听者，直接Push进数组
        handler.push(fn)
    }
    console.log(this._events)
}

EventEmeitter.prototype.removeListener = function(type, fn) {
    const handler = this._events.get(type); // 获取对应事件名称的函数清单
  
    // 如果是函数,说明只被监听了一次
    if (handler && typeof handler === 'function') {
      this._events.delete(type, fn);
    } else {
      let postion;
      // 如果handler是数组,说明被监听多次要找到对应的函数
      for (let i = 0; i < handler.length; i++) {
        if (handler[i] === fn) {
          postion = i;
        } else {
          postion = -1;
        }
      }
      // 如果找到匹配的函数,从数组中清除
      if (postion !== -1) {
        // 找到数组对应的位置,直接清除此回调
        handler.splice(postion, 1);
        // 如果清除后只有一个函数,那么取消数组,以函数形式保存
        if (handler.length === 1) {
          this._events.set(type, handler[0]);
        }
      } else {
        return this;
      }
    }
  };


const emitter = new EventEmeitter();
emitter.addListener('test',message=>{
    console.log(`message1 ${message}`);
})
emitter.addListener('test',message=>{
    console.log(`message2 ${message}`);
})

emitter.emit('test',"这是我发的消息");



