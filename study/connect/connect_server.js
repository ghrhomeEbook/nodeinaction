/**
 * Created by whobird on 17/9/12.
 */
var fs=require('fs')
var join=require('path').join
var static_root=__dirname+'/static'
var logger=require("./logger")

var connect=require('connect');
var app=connect();

app.use(logger(':method :url')).use('/admin',restrict).use('/admin',admin).use(hello);


app.listen(3000);


/*function logger(req,res,next){
    console.log('%s %s',req.method,req.url);
    /!*var writeStream=fs.createWriteStream(join(static_root,'log.json'));
    req.pipe(writeStream)*!/
    next();
}*/

function hello(req,res,next){
    res.write('hello world');
    res.end();
}


function restrict(req,res,next){
    var authorization= req.headers.authorization;
    console.log(authorization);
    if(!authorization) {
        //return next(new Error('Unauthorized'))
        res.writeHead(401,{
            'content-Type':'text/plain',
            'WWW-Authenticate':'Basic realm="family"'
        });
        res.end('');
    }

    var parts=authorization.split(' ')
    var scheme=parts[0]
    var auth=new Buffer(parts[1],'base64').toString().split(':');
    var user=auth[0];
    var pass=auth[1];

    authenicateWithDatabase(user,pass,function(err){
        if(err) return next(err);
        next();
    })
}

function authenicateWithDatabase(user,pass,cb){
    console.log("user-----------------")
    console.log(user);
    console.log(pass);
    if(user=='cheng'&&pass=='whobird'){
        cb();
    }else{
        var error=new Error("401")
        cb(error);
    }

}

function admin(req,res,next){
    switch(req.url){
        case '/':
            res.end('try /users');
            break;
        case '/users':
            res.setHeader('Content-Type','application/json');
            res.end(JSON.stringify(['tobi','loki','jane']));
            break;
    }
}


//common
//app.use(setup{some:'options'});
function setup(option){
    //set option

    return function(req,res,next){

    }

}






























