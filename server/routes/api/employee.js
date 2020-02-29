var express = require('express');
var router = express.Router();
const EmployeeService = require('../../services/employee.service');

const employeeService = new EmployeeService();



/********** These are all mounted to /api/employees *********/

//get all employees
router.get('/', function(req,res,next) {
    employeeService
        .getAll()
        .then(employees => {
            res.json(employees)
        });
});

//get employee list for admin page --> employee, dependent, and emergency contact
router.get('/employeeList', function(req,res,next) {
    employeeService
        .getAllDetail()
        .then(result => res.json(result))
})

//get a specific employees
router.get('/:id', function(req,res,next) {
    employeeService
        .get(req.params.id)
        .then(employee => res.json(employee))
});

//create employees
router.post('/', function(req,res,next){
    let employee = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        position: req.body.position,
        birthday: req.body.birthday,
        gender: req.body.gender,
        contact_no: req.body.contact_no,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip_code: req.body.zip_code,
        department_id: 1, //todo
        role_id: 1 //todo
    };
    employeeService
        .create(employee)
        .then(id => res.json(id))
});


//update the employees
router.put('/:id', function(req,res,next){
    let employee = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        position: req.body.position,
        birthday: req.body.birthday,
        gender: req.body.gender,
        contact_no: req.body.contact_no,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip_code: req.body.zip_code,
        department_id: 1, //todo
        role_id: 1 //todo
    };
    employeeService
        .update(req.params.id,employee)
        .then(affected => res.json(affected))
});

//delete employees
router.delete('/:id', function(req,res,next){
    employeeService
        .delete(req.params.id)
        .then(affected => res.json(affected))
});


module.exports = router;