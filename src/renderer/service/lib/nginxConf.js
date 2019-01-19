const nginxConf=`
worker_processes  1;
events {
    worker_connections  1024;
}
http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;
    $serverConf
}
`
const serverConf=`
    server {
        listen  $port;
        $serverName
        index index.html index.php;
        $locationConf
    }
`
const locationApiConf=`
        location /$api {
            rewrite ^($api/?.*)$ /$1 break;
            proxy_pass $proxyTo;           
            client_max_body_size    50m;
            #proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;	
        }
`
const locationHtmlConf=`
        location /$api {
            root $htmlPath;
            index index.html index.htm;
            try_files $uri $uri/ /index.html; 
        }
`
export const getNginxConf=(conf)=>{
    console.log(conf)
    let txt=`\n`
    conf.forEach(proj=>{
        proj.list.forEach(item=>{
            txt+=serverConf
                .replace('$port',item.serverPort)
                .replace('$serverName',item.serverName?`server_name ${item.serverName}`:'')
                .replace('$locationConf',()=>{
                    let locTxt=`\n`
                    item.locationList.forEach(loc=>{
                        let apiPath=loc.apiPath.slice(1)
                        if(loc.apiType=='api'){
                            locTxt+=locationApiConf
                                .replace(/\$api/g,apiPath)
                                .replace('$proxyTo',loc.proxyTo)
                        }else{
                            locTxt+=locationHtmlConf
                                .replace(/\$api/g,apiPath)
                                .replace('$htmlPath',loc.htmlPath)
                        }
                    })
                    return locTxt
                })

        })
    })
    return nginxConf.replace('$serverConf',txt)
}

