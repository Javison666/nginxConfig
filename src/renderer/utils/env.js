class Env{
    constructor(){}
    isWin(){
        return /windows|win32/i.test(navigator.userAgent)
    }
    isMac(){
        return /macintosh|mac os x/i.test(navigator.userAgent)
    }
}
export default new Env()