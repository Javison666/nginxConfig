/**
 * LocalStorage
 * @constructor
 */
function LocalStorage () {};
LocalStorage.prototype.storage = window.localStorage;
LocalStorage.prototype.setItem =  function(key,value){
    if(this.getType(value) === "Object" || this.getType(value) === "Array"){ // 如果是对象
        value = JSON.stringify(value);
    }

    this.storage.setItem(key,value);
}
LocalStorage.prototype.getItem =  function(key){
    var value = this.storage.getItem(key);
    if(value === null){ // 如果不存在
        return false;
    }
    if(value && value.substring(0,1) === "{" || value.substring(0,1) === "["){ // 如果字符串符合对象或者数组基本特征
        value = JSON.parse(value); // 把字符串转为对象
    }
    return value;
}
LocalStorage.prototype.removeItem = function(key){
    this.getItem(key) && this.storage.removeItem(key);
}
LocalStorage.prototype.clear = function(){
    this.storage.clear(); // 清空本地存储
}
// 判断变量类型
LocalStorage.prototype.getType = function(object){
    /**
     * 方法来源：prototype.js
     * getType(5); // => "Number"
     * getType({}); // => "Object"
     * getType(/foo/); // => "RegExp"
     * getType(''); // => "String"
     * getType(true); // => "Boolean"
     * getType([]); // => "Array"
     * getType(undefined); // => "Window"
     * getType(Element); // => "Constructor"
     **/
    return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
}

export default new LocalStorage()