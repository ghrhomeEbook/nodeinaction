var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.route("register")
    .get(function(req,res,next){
        res.render('user/register', {
            title: 'register'
    });
    }).post(function(req,res,next){

    })

module.exports = router;
