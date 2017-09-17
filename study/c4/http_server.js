/**
 * Created by whobird on 17/9/7.
 */


var http=require('http')
var url=require('url')

var items=[]

var server=http.createServer(function(req,res){
    req.setEncoding('utf8');
    console.log(req.url);
    switch(req.method){
        case 'POST':
            var item='';
            req.on('data',function(chunk){
                item+=chunk;
            });
            req.on('end',function(){
                items.push(item);
                res.end('OK\n');
            });
            break;
        case 'GET':
            var body=items.map(function(item,i){
                return i+":"+item
            }).join("\n");
            res.setHeader("Content-Length",Buffer.byteLength(body));
            res.setHeader("Content-Type",'text/plain; charset="utf-8"');
            res.end(body);
            break;
        case 'DELETE':
            var path=url.parse(req.url).pathname;
            var i=parseInt(path.slice(1),10);

            if(isNaN(i)){
                res.statusCode=400;
                res.end('Invalid item id')
            }else if(!items[i]){
                res.statusCode=400;
                res.end('item not found')
            }else{
                res.statusCode=200;
                items.splic(i,1)
                res.end("delete!\n")
            }

    }


});

server.listen(3000);

























