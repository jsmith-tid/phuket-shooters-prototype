const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
require('./build');
const root=path.resolve(__dirname,'../dist'); const port=Number(process.env.PORT||8080);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.jpg':'image/jpeg','.mp4':'video/mp4','.txt':'text/plain; charset=utf-8'};
http.createServer((req,res)=>{let pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);let file=path.join(root,pathname);if(path.extname(file)==='')file=path.join(file,'index.html');if(!file.startsWith(root)){res.writeHead(403);return res.end();}fs.readFile(file,(err,data)=>{if(err){res.writeHead(404);res.end('Not found');return;}res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');res.end(data);});}).listen(port,()=>console.log(`Prototype: http://localhost:${port}`));
