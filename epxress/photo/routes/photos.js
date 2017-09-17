/**
 * Created by whobird on 17/9/17.
 */
var express = require('express');
var router = express.Router();
var config=require("../app_config");

var path=require('path');
var fs=require('fs');
var join=path.join;

console.log(config)
var photoPath=config.photos;
console.log(photoPath)
var Photo=require("../models/Photos");


/* GET home page. */
router.get('/list', function(req, res, next) {
    Photo.find({},function(err,photos){
        if(err){
            return next(err)
        }else{
            res.locals.testVal='testVal locals'
            res.render('photos', {
                title: 'photos',
                photos:photos
            });
        }
    })

});

router.route("/upload")
    .get(function(req,res,next){
        res.render('photos/upload', {
            title: 'Photo upload'
        });
    })
    .post(function(req,res,next){
        console.log("files-----------------")
        console.log(req.files);
        var img=req.files.image;
        var name=req.body.name;
        console.log(name);
        var path=join(photoPath,img.name);
        fs.rename(img.path,path,function(err){
            if(err){
                return next(err);
            }else{
                Photo.create({
                    name:name,
                    path:img.name,
                },function(err){
                    if(err){
                        return next(err)
                    }else{
                        res.redirect("/");
                    }
                })
            }
        })
    });

router.get("/:id/download",function(req,res,next){
    var id=req.params.id;
    console.log(id);
    Photo.findById(id,function (err,photo) {
        console.log(photo);
        if(err){
            return next(err)
        }else{
            var path=join(photoPath,photo.path);
            console.log(path);
            res.download(path)
        }
    })
})

module.exports = router;

