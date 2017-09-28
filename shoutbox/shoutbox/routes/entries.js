/**
 * Created by whobird on 17/9/28.
 */

var express = require('express');
var Entry=require("../lib/entry");
var EntryFunc=require('./entries/entryFunc')
var router = express.Router();



/* GET users listing. */
router.get('/', function(req, res, next) {
    //res.send('entry route ---');
    EntryFunc.list(req,res,next);
});

router.route("/post")
    .get(function(req,res,next){
        res.render('entries/post', {
            title: 'post'
        });
    }).post(function(req,res,next){

        console.log("entry submit-----------------------")
        console.log(req.body);
        console.log(req.body.entry);
        console.log("entry submit-----------------------")

        var data=req.body;
        var entry=new Entry({
            'username':res.locals.user.name,
            'title':data.title,
            'body':data.body
        });
        entry.save(function(err){
            if(err) return next(err);
            res.redirect('/entries/');
        })
});



module.exports=router;

















