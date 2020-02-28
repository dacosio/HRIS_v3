var express = require('express');
var router = express.Router();
const UndertimeOvertimeService = require('../../services/undertime_overtime.service');

const undertimeOvertimeService = new UndertimeOvertimeService();

/********** These are all mounted to /api/time *********/

//get all roles
router.get('/', function(req,res,next) {
    undertimeOvertimeService
        .getAll()
        .then(times => {
            res.json(times)
        });
});


//get a specific role
router.get('/:id', function(req,res,next) {
    undertimeOvertimeService
        .get(req.params.id)
        .then(time => res.json(time))
});

//create role
router.post('/', function(req,res,next){
    let time = {
        date_filed: req.body.date_filed,
        from_time: req.body.from_time,
        to_time: req.body.to_time,
        reason: req.body.reason,
        time_type: req.body.time_type,
        created_by: req.body.created_by //todo
    };
    undertimeOvertimeService
        .create(time)
        .then(id => res.json(id))
});


//update the role
router.put('/:id', function(req,res,next){
    let time = {
        date_filed: req.body.date_filed,
        from_time: req.body.from_time,
        to_time: req.body.to_time,
        reason: req.body.reason,
        created_by: 1 //todo
    };
    undertimeOvertimeService
        .update(req.params.id,time)
        .then(affected => res.json(affected))
});

//delete role
router.delete('/:id', function(req,res,next){
    undertimeOvertimeService
        .delete(req.params.id)
        .then(affected => res.json(affected))
});


module.exports = router;