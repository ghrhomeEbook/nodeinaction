/**
 * Created by whobird on 17/9/10.
 */
var qs=require('querystring')

exports.sendHtml=function(res,html){
    res.setHeader('Content-Type','text/html');
    res.setHeader("Content-Length",Buffer.byteLength(html));
    res.end(html);
}




db.query(
    'CREATE TABLE IF NOT EXISTS work ('
    + 'id INT(10) NOT NULL AUTO_INCREMENT ,'
    + 'hours DECIMAL(5,2) DEFAULT 0 ,'
    + 'date DATE ,'
    + 'archived INT(1) DEFAULT 0 ,'
    + 'description LONGTEXT ,'
    + 'PRIMARY KEY (id)',
    function(err){
        if(err) throw err;
        console.log('server started ...');
        server.listen(3000)
    }
)