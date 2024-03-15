import http from 'http';
import { url } from 'inspector';

const server=http.createServer((req,res)=>{
    const url=req.url;
    res.setHeader('content-type','text/html');
    res.write('<html>');
     res.write('<header><title>My first page</title></header>');
     if(url==='/home') { 
     res.write('<body><h1>Welcome Home</h1></body>');
     res.write('</html>');
    res.end();
     }
    else if(url==='/about') { res.write('<body><h1>Welcome to about us page</h1></body>');
    res.write('</html>');
    res.end();
     }
    else if(url==='/node') {res.write('<body><h1>Welcome to my Node Js project</h1></body>');
     res.write('</html>');
     res.end();
    }
  
});
server.listen(8000);

