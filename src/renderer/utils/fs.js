import fs from 'fs'
class Fs {
    constructor() {}
    //文件的读取
    read({
        path
    }) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data.toString())
                }
            })
        })
    }
    /**
     * 写入文件
     * @param {*text} 文件内容
     * @param {*path} 文件路径
     */
    write({
        text,
        path
    }) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path, text, (err) => {
                if (err) reject(err);
                else resolve({
                    state: true
                })
            });
        })
    }
    /**
     * 删除文件
     * @param {*path} 文件路径
     */
    del({
        path
    }) {
        return new Promise((resolve, reject) => {
            var files = [];
            if (fs.existsSync(path)) {
                files = fs.readdirSync(path);
                files.forEach((file, index) => {
                    var curPath = path + "/" + file;
                    if (fs.statSync(curPath).isDirectory()) { // recurse
                        this.del({
                            path: curPath
                        })
                    } else { // delete file
                        fs.unlinkSync(curPath);
                    }
                });
                fs.rmdirSync(path);
            }
            resolve()
        })

    }
    /**
     * 判断文件地址是否存在，存在返回true，不存在返回false
     * @param {*} 文件目录 
     */
    isExist({
        path
    }) {
        return new Promise((resolve) => {
            fs.exists(path, (exist) => {
                if (exist) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        })
    }
    /**
     * 创建文件目录
     * @param {*} param0 
     */
    mkdir({
        path
    }) {
        return new Promise((resolve) => {
            fs.exists(path, (exist) => {
                if (exist) {
                    // 若已经存在，则不处理
                    resolve(true)
                } else {
                    // 若不存在则直接创建
                    fs.mkdir(path, {
                        recursive: true
                    }, (err) => {
                        if (err) return resolve(false)
                        return resolve(true)
                    });
                }
            })
        })
    }
}

export default new Fs()