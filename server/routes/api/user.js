var express = require('express');
var router = express.Router();
const UserService = require('../../services/user.service');

const userService = new UserService();

/********** These are all mounted to /api/users *********/

//get all users
router.get('/', function(req, res, next){
    userService
        .getAll()
        .then(users => {
            res.json(users);
        });
});

//get a specific user
router.get('/:id', function(req, res, next){
    userService
        .get(req.params.id)
        .then(user => res.json(user));
});


//create user
router.post('/', function(req, res, next){
    let user = {
      email: req.body.email,
      password: req.body.password,
      employee_id: req.body.employee_id //todo
    };
      userService
        .create(user)
        .then(id => res.json(id));
        // res.render('login')
});

//update the user profile
router.put('/:id', function(req, res, next){
    let user = {
        email: req.body.email,
        password: req.body.password,
        employee_id: 2
      };
    userService
        // .update(req.session.passport.user.id, user)
        .update(req.params.id, user)
        .then(affected => res.json(affected));
});

//delete user (:/id)
router.delete('/:id', function(req, res, next){
    userService
        .delete(req.params.id)
        .then(affected => res.json(affected));
});

module.exports = router;