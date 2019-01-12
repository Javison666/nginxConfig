import exec from './exec'
import env from './env'

export const isPortUsable =async (port)=>{
    let cmd
    let res
    
    if(env.isMac()){
        cmd=`lsof -i tcp:${port}`
    }
    if(env.isWin()){
        cmd=`netstat -aon|findstr ${port}`
    }
    res= await exec.info({
        cmd
    })
    console.log(res)
    if(res.state){
        return false
    }else{
        return true
    }
}