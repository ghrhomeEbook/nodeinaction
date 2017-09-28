/**
 * Created by whobird on 17/9/28.
 */

var express = require('express');
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
        var data=req.body.entry;
        var entry=new Entry({
            'username':res.locals.user.name,
            'title':data.title,
            'body':data.body
        });
        entry.save(function(err){
            if(err) return next(err);
            res.redirect('/');
        })
});



module.exports=router;

















