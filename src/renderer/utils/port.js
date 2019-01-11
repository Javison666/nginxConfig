import exec from './exec'
import env from './env'

export const isPortUsable =async (port)=>{
    let cmd
    let res
    if(!/^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{4}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(port)){
        return false
    }
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