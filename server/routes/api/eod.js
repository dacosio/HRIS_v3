var express = require('express');
var router = express.Router();
const EodService = require('../../services/eod.service');

const eodService = new EodService();

/********** These are all mounted to /api/eods *********/

//get all eods
router.get('/', function(req,res,next) {
    eodService
        .getAll()
        .then(eods => {
            res.json(eods)
        });
});


//get a specific eods
router.get('/:id', function(req,res,next) {
    eodService
        .get(req.params.id)
        .then(log => res.json(log))
});

//create eods
router.post('/', function(req,res,next){
    let eod = {
        accomplishments: req.body.accomplishments,
        impediments: req.body.impediments,
        next_day_target: req.body.next_day_target,
        concerns: req.body.concerns,
        created_by: req.user.id //todo
    };
    eodService
        .create(eod)
        .then(id => res.json(id))
});


//update the eods
router.put('/:id', function(req,res,next){
    let eod = {
        accomplishments: req.body.accomplishments,
        impediments: req.body.impediments,
        next_day_target: req.body.next_day_target,
        concerns: req.body.concerns,
        created_by: req.user.id //todo
    };
    eodService
        .update(req.params.id,eod)
        .then(affected => res.json(affected))
});

//delete eods
router.delete('/:id', function(req,res,next){
    eodService
        .delete(req.params.id)
        .then(affected => res.json(affected))
});


module.exports = router;