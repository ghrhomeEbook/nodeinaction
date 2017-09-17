/**
 * Created by whobird on 17/9/8.
 */

var http=require('http');
var parse=require('url').parse;
var join=require('path').join;
var fs=require('fs');

var root=__dirname;
console.log(root)
var static_root=root+'/static'
var server=http.createServer(function(req,res){
    var url=parse(req.url);
    var path=join(static_root,url.pathname);
    console.log(path);
    var stream =fs.createReadStream(path);
    stream.on('data',function(chunk){
       res.write(chunk);
    });
    stream.on('end',function(){
        res.end();
    });
    stream.on('error',function(){
        res.statusCode=404;
        res.end("not found");
    })
});

server.listen(3000)

