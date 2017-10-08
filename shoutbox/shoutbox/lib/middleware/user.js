/**
 * Created by whobird on 17/9/28.
 */

var User=require('../user');

module.exports=function(req,res,next){

    if(req.remoteUser){
        res.locals.user=req.remoteUesr;
    }
    var uid=req.session.uid;

    if(!uid) return next();

    User.get(uid,function(err,user){
        if(err) return next(err);
        req.user=res.locals.user=user;
        next();
    })
}