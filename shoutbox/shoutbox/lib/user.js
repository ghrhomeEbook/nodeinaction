var redis=require('redis');

var RDS_PORT=6379;
var RDS_HOST= 'r-bp1364a122cadd64.redis.rds.aliyuncs.com';
var RDS_OPTS={auth_pass:'Ghrhome2009'};
var bcrypt=require('bcrypt');
var db=redis.createClient();

module.exports=User;

db.on("ready",function(){
    console.log("redis connect");
})

//new User({name:'Tobi'})
function User(obj){
    for (var key in obj){
        this[key]=obj[key];
    }
}

User.prototype.save=function (fn) {
    if(this.id){
        this.update(fn)
    }else{

        var user=this;

        db.incr('user:ids',function(err,id){
           if(err){
               return fn(err);
           }else{
               console.log(id);
               user.id=id;
               user.hashPassword(function(err){
                  if(err) return fn(err);

                  user.update(fn);
               });
           }
        });
    }
};

User.prototype.update=function(fn){
    var user=this;

    var id=user.id;
    db.set('user:id:'+user.name,id, function(err){
        if(err) return fn(err);

        db.hmset('user:'+id, user,function(err){
            fn(err);
        });

    });
}

User.prototype.hashPassword=function(fn){
    var user=this;
    console.log(user);
    console.log("---------user-----------");
    bcrypt.genSalt(12,function(err,salt){
        console.log(salt);
        console.log("salt err-----------")
        if(err) return fn(err);
        console.log(salt);
        user.salt=salt;

        bcrypt.hash(user.pass,salt,function(err,hash){
           if(err) return fn(err);
            console.log(hash);
           user.pass=hash;

           fn();
        });
    })
}

User.getByName=function(name,fn){
    User.getId(name,function(err,id){
        if(err) return fn(err);

        User.get(id,fn);
    })
}

User.getId=function(name,fn){
    db.get('user:id:'+name,fn);
}

User.get=function(id,fn){
    db.hgetall('user:'+id,function(err,user){
       if(err) return fn(err);

       fn(null,new User(user));
    });
}

User.authenticate=function(name,pass,fn){
    User.getByName(name,function(err,user){
       if(err) return fn(err);

       if(!user.id) return fn();//用户为注册 不存在

        bcrypt.hash(pass,user.salt,function(err,hash){
            if(err) return fn(err)

            if(hash==user.pass){
                //user认证成功
                return fn(null,user);
            }

            return fn()//密码不正确
        })

    });
}

//test user
/*

var tobi=new User({
   name:'Tobi',
   pass:'im a ferret',
   age:'2'
});

tobi.save(function(err){
    console.log("save---------");
    if(err) throw err;

    console.log('user id %d', tobi.id);
});*/
