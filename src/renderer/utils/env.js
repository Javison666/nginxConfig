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
}
export default new Env()