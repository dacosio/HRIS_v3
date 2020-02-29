var express = require('express');
var router = express.Router();
const LogService = require('../../services/log.service');
const moment = require('moment');

const logService = new LogService();

/********** These are all mounted to /api/logs *********/

//get all logs
router.get('/', function(req,res,next) {
    logService
        .getAll()
        .then(logs => {
            res.json(logs)
        });
});


//get a specific logs
router.get('/:id', function(req,res,next) {
    logService
        .get(req.params.id)
        .then(log => res.json(log))
});

//create logs
router.post('/', function(req,res,next){
    let log = {
        time_in: new Date(),//req.body.time_in,
        time_out: null,//req.body.time_out,
        created_by: 1 //todo
    };
    logService
        .create(log)
        .then(id => res.json(id))
});


//update the logs
router.put('/:id', function(req,res,next){
    let log = {
        time_out: new Date(),
    };
    logService
        .update(req.params.id,log)
        .then(affected => res.json(affected))
});

//delete logs
router.delete('/:id', function(req,res,next){
    logService
        .delete(req.params.id)
        .then(affected => res.json(affected))
});


module.exports = router;