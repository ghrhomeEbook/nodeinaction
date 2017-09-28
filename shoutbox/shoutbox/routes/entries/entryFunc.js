/**
 * Created by whobird on 17/9/28.
 */
var Entry=require('../../lib/entry')

exports.list=function(req,res,next){
    Entry.getRange(0,-1,function(err,entries){
        if(err) return next(err);

        res.render('entries/entries',{
            title:'Entries',
            entries:entries
        })
    })
};

exports.submit=function(req,res,next){
    var data=req.body.entry;

    if(!data.title){
        res.error("Title is required");

        res.redirect('back')
        return;
    }
    if(data.title.length<4){
        res.error("title mustlonger that 4 characters")
        res.redirect('back');
        return;
    }
}