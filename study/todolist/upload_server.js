/**
 * Created by whobird on 17/9/8.
 */

var http=require('http');
var qs=require('queryString')
var formidable=require('formidable')

var items=[];

var server=http.createServer(function(req,res){
   if('/'==req.url){
       switch (req.method){
           case 'GET':
               show(res);
               break;
           case 'POST':
               upload(req,res);
               break;
           default:
               badRequest(res)
       }
   }else{
       notFound(res)
   }
});

server.listen(3000);

function show(res){
    var html='<html>'
        +'<body>'
        +   '<h1>'
        +       'File Upload'
        +   '</h1>'

        +   '<form method="post" action="/" enctype="multipart/form-data">'
        +       '<p><input type="text" name="name" /></p>'
        +       '<p><input type="file" name="file"/></p>'
        +       '<p><input type="submit" value="upload"/></p>'
        +   '</form>'
        +'</body>'
        +'</html>';


    res.setHeader('Content-Type','text/html');

    console.log("-------------------")
    console.log(html);
    res.setHeader('Content-Length',Buffer.byteLength(html));

    res.end(html);
}

function notFound(res){
    res.statusCode=404;
    res.setHeader('Content-Type','text/plain');
    res.end('Not Found');
}

function badRequest(res){
    res.statusCode=400;
    res.setHeader('Content-Type','text/plain');
    res.end('Bad request')
}

function upload(req,res){
    if(! isFormData(req)){
        res.statusCode=400;
        res.end('BAD REQUEST: expection multipart/form-data');
        return;
    }

    var form =new formidable(req);
    form.parse(req);

    form.on('field',function(field,value){
        console.log(field);
        console.log(value);
    });

    form.on('file',function(name,file){
        console.log(name);
        //console.log(file);
    });

    form.on('progress',function(br,be){
        var percent=Math.floor(br/be*100);
        console.log('precent:'+percent)
    })

    form.on('end',function(){
        res.end('upload complete');
    });
}

function isFormData(req){
    var type=req.headers['content-type']||'';
    return 0==type.indexOf('multipart/form-data');
}

