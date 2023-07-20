
const fs= require('fs');

const requestHandler=(req,res)=>{
const url=req.url;
    
const method=req.method;

if(url==='/'){
    fs.readFile('message.txt', {encoding: 'utf-8'},
    (err,data)=>{
       if(err){
        console.log(err)
       }

       res.setHeader('Content-Type', 'text/html');
       res.write('<html>');
       res.write('<head> <title> Message Input </title></head>');
       res.write(`<body>${data}</body>`)
       res.write('<body><form action="/message" method="POST" ><input type="text" name="message"><button type="submit">Send</button></form></body');
       res.write('<html>')
       return res.end();
    })
}

else if(url==='/message' && method==='POST'){
    const body=[];
    req.on('data', (chunk)=>{
        console.log(chunk);
        body.push(chunk)
        console.log(body);
    })
    req.on('end',()=>{
        const parsedBody=Buffer.concat(body).toString();
        const message=parsedBody.split('=')[1];
        fs.writeFileSync('message.txt', message);
    })
    res.statusCode=302;
    res.setHeader('Location', '/');
    return res.end();
}

else{
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>')
    res.write('<head><title>Home Page</title> </head>');
    res.write('<body><h1>Welcome to Home Page</h1></body>');
    res.write('</html>');
    res.end();
}
}

module.exports=requestHandler;

// module.exports={
//     handler: requestHandler;
//     someText: 'Some hard coded text';
// }

// module.exports.handler=requestHandler;
// module.exports.someText='some hard coded text';

// exports.handler=requestHandler;
// exports.someText='some hard coded text';
