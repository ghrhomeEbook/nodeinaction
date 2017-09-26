/**
 * Created by whobird on 17/9/27.
 */
var User=require("../lib/user");

module.exports=function(req,res,next){
    var data=req.body;

    User.authenticate(data.name,data.pass,function(err,user){

        if(err){
            return next(err);
        }
        if(user){
            req.session.uid=user.id;

            res.redirect("/")
        }else{
            res.error('Sorry! invalid credentials.')
            res.redirect('back')
        }
    })
}