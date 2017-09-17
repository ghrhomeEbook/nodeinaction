/**
 * Created by whobird on 17/9/7.
 */
var canadianDollar=.91;

function roundTwoDecimals(amount){
    return Math.round(amount*100)/100
}

exports.canadianToUs=function(canadian){
    return roundTwoDecimals(canadian*canadianDollar)
}

exports.usToCanadian=function(us){
    return roundTwoDecimals(us/canadianDollar)
}














