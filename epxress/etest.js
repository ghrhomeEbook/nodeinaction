/**
 * Created by whobird on 17/9/17.
 */


var express=require('express');

var app=express();

app.get('/',function(req,res){
   res.send('Hello world');
});

app.listen(3000)