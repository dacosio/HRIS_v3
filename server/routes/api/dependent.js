var express = require('express');
var router = express.Router();
const DependentService = require('../../services/dependent.service');

const dependentService = new DependentService();

/********** These are all mounted to /api/dependent *********/

//get all dependents
router.get('/', function(req,res,next) {
    dependentService
        .getAll()
        .then(dependents => {
            res.json(dependents)
        });
});


//get a specific dependent
router.get('/:id', function(req,res,next) {
    dependentService
        .get(req.params.id)
        .then(dependents => res.json(dependents))
});

//create dependent
router.post('/', function(req,res,next){
    let dependents = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        birthday: req.body.birthday,
        relationship: req.body.relationship,
        contact_no: req.body.contact_no,
        employee_id: 1 //todo
    };
    dependentService
        .create(dependents)
        .then(id => res.json(id))
});


//update the dependent
router.put('/:id', function(req,res,next){
    let dependents = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        birthday: req.body.birthday,
        relationship: req.body.relationship,
        contact_no: req.body.contact_no,
        employee_id: 1 //todo
    };
    dependentService
        .update(req.params.id,dependents)
        .then(affected => res.json(affected))
});

//delete dependent
router.delete('/:id', function(req,res,next){
    dependentService
        .delete(req.params.id)
        .then(affected => res.json(affected))
});


module.exports = router;