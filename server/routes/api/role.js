var express = require('express');
var router = express.Router();
const RoleService = require('../../services/role.service');

const roleService = new RoleService();

/********** These are all mounted to /api/roles *********/

//get all roles
router.get('/', function(req,res,next) {
    roleService
        .getAll()
        .then(roles => {
            res.json(roles)
        });
});


//get a specific role
router.get('/:id', function(req,res,next) {
    roleService
        .get(req.params.id)
        .then(role => res.json(role))
});

//create role
router.post('/', function(req,res,next){
    let role = {
        role: "admin" //tl or employee
    };
    roleService
        .create(role)
        .then(id => res.json(id))
});


//update the role
router.put('/:id', function(req,res,next){
    let role = {
        role: "admin" //tl or employee
    };
    roleService
        .update(req.params.id,role)
        .then(affected => res.json(affected))
});

//delete role
router.delete('/:id', function(req,res,next){
    roleService
        .delete(req.params.id)
        .then(affected => res.json(affected))
});


module.exports = router;