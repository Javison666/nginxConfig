class Env{
    constructor(){}
    isWin(){
        if(navigator){
            return /windows|win32/i.test(navigator.userAgent)
        }else{
            return false
        }
        
    }
    isMac(){
        if(navigator){
            return /macintosh|mac os x/i.test(navigator.userAgent)
        }else{
            return false
        }
        
    }
    getIP(){
        let interfaces = require('os').networkInterfaces();
        for(let devName in interfaces){
            let iface = interfaces[devName];
            for(let i=0;i<iface.length;i++){
                let alias = iface[i];
                if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
                    return alias.address;
                }
            }
        }
    }
    getHostName(){
        return require("os").hostname()
    }
}
export default new Env()