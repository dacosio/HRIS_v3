var express = require('express');
var router = express.Router();
//TEST ROUTES

//employee deatails
router.get('/', (req,res,next) => {
  res.send({message:'backend connected'})
})



module.exports = router;