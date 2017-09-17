/**
 * Created by whobird on 17/9/12.
 */
function setup(format){
    var regexp='/:(\w+)/g';
    return function logger(req,res,next){
        var str=format.replace(regexp,function(match,property){
            return req[property];
        });

        console.log(str);
        next();
    }
}
exports.logger=setup;


























