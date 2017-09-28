var express = require('express');
var regSubmit=require("./users/register_submit")
var login=require("./users/login")
var logout=require('./users/logout')

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
        console.log(req.body.user)
        console.log(regSubmit)
        regSubmit(req,res,next);
    });

router.route("/login")
    .get(function(req,res,next){
        res.render('user/login', {
            title: 'Login'
        });
    }).post(function(req,res,next){
        login(req,res,next);
});

router.route("/logout")
    .get(function(req,res,next){
       logout(req,res,next);
});
module.exports = router;
