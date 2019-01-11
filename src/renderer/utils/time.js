class Time{
    constructor(){

    }
    // 等待秒数
    waitingSec(sec){
        return new Promise((resolve)=>{
            setTimeout(()=>{
                resolve()
            },sec*1000)
        })
    }
}
export default new Time()