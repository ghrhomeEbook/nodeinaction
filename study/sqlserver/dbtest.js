/**
 * Created by whobird on 17/9/10.
 */

var mysql=require('mysql')

var db=mysql.createConnection({
    host:'rm-m5e2595mjh14olb5so.mysql.rds.aliyuncs.com:3306',
    user:'ghrhome',
    password:'ghrhome@2009',
    database:'nodestudy'
})


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
       // server.listen(3000)
    }
)