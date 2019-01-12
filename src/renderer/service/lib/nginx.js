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
    if (env.isWin()) {
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
    if (env.isMac()) {
        exec.once({
            cmd: 'brew install nginx',
        })
    }

}

// 监测nginx是否运行
export const isNginxRunning = async () => {
    let res
    return new Promise(async (resolve) => {
        if (env.isWin()) {
             res= await exec.info({
                cmd: 'tasklist /nh|find /i "easynginx.exe"',
            })
            if (res.state) {
                resolve(true)
            } else {
                resolve(false)
            }
        }
        if (env.isMac()) {
            res = await exec.info({
                cmd: 'ps aux | grep nginx:',
            })
            if (res.state) {
                res.data=res.data.split('\n')
                if (res.data.length > 3) {
                    resolve(true)
                }
            }
            resolve(false)
        }
    })
}

// 关闭nginx
export const stopNginx = async () => {
    return new Promise(async (resolve)=>{
        if(env.isWin()){
            await exec.once({
                cmd:'taskkill /f /t /im easynginx.exe'
            })
        }
        if (env.isMac()) {
            await exec.once({
                cmd: 'nginx -s stop',
            })
        }
        resolve(true)
    })
    
}

// 运行-重载nginx
export const runNginx = async () => {
    let res
    return new Promise(async (resolve)=>{
        if (env.isWin()) {
            res = await isNginxRunning()
            if(res){
                await stopNginx()
            }
            exec.once({
                cmd: easyNginxName,
                path: easyNginxPath,
            })
            resolve(true)
        }
        if (env.isMac()) {
            await stopNginx()
            await exec.once({
                cmd: 'nginx',
            })
        }
        resolve(true)
    })
    
}