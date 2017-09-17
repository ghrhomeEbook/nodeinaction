/**
 * Created by whobird on 17/9/10.
 */
var http=require('http')
var work=require('./lib/timetrack')
var mysql=require('mysql')

var db=mysql.createConnection({
    host:'rm-m5e2595mjh14olb5so.mysql.rds.aliyuncs.com:3306',
    user:'ghrhome',
    password:'ghrhome@2009',
    database:'nodestudy'
})

var server=http.createServer(function (req,res) {
    switch (req.methos){
        case "POST":
            switch(req.url){
                case '/':
                    work.add(db,req,res);
                    break;
                case '/archive':
                    work.archive(db,req,res);
                    break;
                case '/delete':
                    work.delete(db,req,res);
                    break;
            }
            break;
        case 'GET':
            switch(req.url){
                case '/':
                    work.show(db,res);
                    break;
                case '/archived':
                    work.showArchived(db,res)
                    break;
            }
            break;

    }
});

