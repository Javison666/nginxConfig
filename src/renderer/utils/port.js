import exec from './exec'

export const isPortUsable =async (port)=>{
    let res= await exec.info({
        cmd:`netstat -aon|findstr ${port}`
    })
    if(res.state){
        return false
    }else{
        return true
    }
}