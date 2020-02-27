var express = require('express');
var router = express.Router();
const DepartmentService = require('../../services/department.service');

const departmentService = new DepartmentService();

/********** These are all mounted to /api/departments *********/

//get all departments
router.get('/', function(req,res,next) {
    departmentService
        .getAll()
        .then(departments => {
            res.json(departments)
        });
});


//get a specific department
router.get('/:id', function(req,res,next) {
    departmentService
        .get(req.params.id)
        .then(department => res.json(department))
})

//create departments
router.post('/', function(req,res,next){
    let department = {
        department: req.body.department,
    };
    departmentService
        .create(department)
        .then(id => res.json(id))
        
})


//update the departments
router.put('/:id', function(req,res,next){
    let department = {
        department: req.body.department,
    };
    departmentService
        .update(req.params.id,department)
        .then(affected => res.json(affected))
})

//delete departments
router.delete('/:id', function(req,res,next){
    departmentService
        .delete(req.params.id)
        .then(affected => res.json(affected))
})


module.exports = router