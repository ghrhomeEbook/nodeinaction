/**
 * Created by whobird on 17/9/8.
 */

var http=require('http');
var parse=require('url').parse;
var join=require('path').join;
var fs=require('fs');

var root=__dirname;
var static_root=root+'/static';
var server=http.createServer(function(req,res){
   var url=parse(req.url);
   var path=join(static_root,url.pathname);

   fs.stat(path,function(err,stat){
      if(err){
          if('ENOENT'==err.code){
              res.statusCode=404;
              res.end('NOT FOUND');
          }else{
              res.statusCode=500;
              res.end('internal error');
          }
      } else{
          res.setHeader('Content-Length',stat.size);
          var stream=fs.createReadStream(path);
          stream.on('error',function(err){
              res.statusCode=500;
              res.end('internal error');
          })
          stream.pipe(res);
      }
   });
});

server.listen(3000)