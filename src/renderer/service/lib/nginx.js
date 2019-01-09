import fs from 'fs'
import _fs from '@/utils/fs'
import unzip from 'unzip'
import appApi from '@/api/app'
import exec from '@/utils/exec'
import env from '@/utils/env'

const easyNginxName = 'easynginx.exe'
const easyNginxZipName = 'easy-nginx.zip'
const easyNginxPath = appApi.localPath + '\\nginx\\easy-nginx'

// /nginx/easy-nginx/

export const installNginx = async () => {
    if(env.isWin()){
        await _fs.mkdir({
            path: appApi.localPath + '\\nginx'
        })
        _fs.del({
            path: easyNginxPath
        })
        fs.createReadStream(__static + '\\' + easyNginxZipName)
            .pipe(unzip.Extract({
                path: appApi.localPath + '\\nginx\\'
            }))
        // const rs = fs.createReadStream(__static + '\\' + easyNginxZipName); // 文件读取流
        // const ws = fs.createWriteStream(easyNginxPath + '.zip'); // 文件写入流
        // rs.on('data', (chunk) => {
        //     ws.write(chunk); // Node中的Buffer不占用垃圾回收机制中的内存。  Buffer是由C/C++模块维护。  'data'+chunk会在内部自动调用toString()函数。 建议直接返回buffer节省处理字符串的性能开销。
        // })
        // rs.on('end', () => {
        //     ws.end();
        // })
    }
    if(env.isMac()){
        exec.once({
            cmd: 'brew install nginx',
        })
    }
    
}

// 监测nginx是否运行
export const isNginxRunning = async () => {
    if(env.isWin()){
        let res = await exec.info({
            cmd: 'tasklist /nh|find /i "easynginx.exe"',
        })
        if (res.state) {
            return true
        } else {
            return false
        }
    }
    if(env.isMac()){
        let res = await exec.info({
            cmd: 'ps aux | grep nginx:',
        })
        if(res.state){
            res.data.split('\n')
            if(res.data.length>2){
                return true
            }
        }
        return false
    }
}

// 关闭nginx
export const stopNginx=async ()=>{
    if(env.isMac()){
        exec.once({
            cmd: 'nginx -s stop',
        })
    } 
}

// 运行-重载nginx
export const runNginx = async () => {
    if(env.isWin()){
        let res = await isNginxRunning()
        if (!res) {
            // 若未运行，则运行
            exec.once({
                cmd: easyNginxName,
                path: easyNginxPath
            })
        }else{
            // 若已运行，则重新加载配置
            exec.once({
                cmd: easyNginxName+' -s reload',
                path: easyNginxPath
            })
        }
    }
    if(env.isMac()){
        await stopNginx()
        exec.once({
            cmd: 'nginx',
        })
    }
}

