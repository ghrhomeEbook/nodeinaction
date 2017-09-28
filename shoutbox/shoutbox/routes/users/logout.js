/**
 * Created by whobird on 17/9/27.
 */
module.exports=function(req,res,next){
    req.session.destroy(function (err) {
        if(err){
            return false;
        }

        res.redirect("/")
    })
}