/**
 * Created by whobird on 17/9/26.
 */
var User=require("../../lib/user");

module.exports=function(req,res,next){
    var data=req.body;
    console.log(req.body)
    console.log("data---------")
    console.log(data)
    User.getByName(data.name,function(err,user){

        if(err){
            return next(err);
        }
        if(user.id){
            res.error("Username already taken");

            res.redirect('back')
        }else{
            user=new User({
                name:data.name,
                pass:data.pass
            });
            console.log("save---------------")
            user.save(function(err){
               if(err){
                   return next(err);
               }
               req.session.uid=user.id;
                console.log("....")
               res.redirect("/")
            });
        }
    })
}