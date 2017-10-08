/**
 * Created by whobird on 17/10/8.
 */

var express= require('express');
var router=express.Router();
var apiFunc=require('./api/apiFunc')

router.use(apiFunc.auth);

router.get('/user/:id',apiFunc.user);
router.get('/entries/:page?',apiFunc.entries);
router.post('/entry',apiFunc.add)