var express = require('express');
var regSubmit=require("./register_submit")

var router = express.Router();



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

function _setLocals(req,res,next){
    res.locals.messages= [
            {
                type: 'errror',
                string: 'error message'
            }
        ];
    res.locals.removeMessages=function(){
        res.locals.messages=[];
        }
    console.log("--------")

    next();
};

/*
router.route("/register")
    .get(_setLocals,function(req,res,next){

        res.render('user/register', {
            title: 'register'
         });
    }).post(function(req,res,next){

    })
*/
router.route("/register")
    .get(function(req,res,next){
        res.render('user/register', {
            title: 'register'
        });
    }).post(function(req,res,next){
        regSubmit(req,res,next);
    });

module.exports = router;
