var express = require('express');
var router = express.Router();
const jwt = require("jwt-simple");
const config = require('../../config');
const authClass = require('../../auth')();
const UserService = require('../../services/user.service');

const userService = new UserService();

/********** These are all mounted to /api/users *********/

//get all users
router.get('/', authClass.authenticate(), function(req, res, next){
    userService
        .getAll()
        .then(users => {
            res.json(users);
        });
});

//get a specific user
router.get('/:id', authClass.authenticate(), function(req, res, next){
    userService
        .get(req.params.id)
        .then(user => res.json(user));
});


//create user
router.post('/', authClass.authenticate(), function(req, res, next){
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
router.put('/:id', authClass.authenticate(), function(req, res, next){
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
router.delete('/:id', authClass.authenticate(), function(req, res, next){
    userService
        .delete(req.params.id)
        .then(affected => res.json(affected));
});

router.post("/login", function(req, res) {
  console.log(req.body);
  if (req.body.email && req.body.password) {
      var email = req.body.email;
      var password = req.body.password;

// Logic here reads from a JSON, in a real application you will read from a database
      userService
        .login(email, password)
        .then((users) => {

          if (users && users.length > 0) {
            const user = users[0];
            var token = jwt.encode(user, config.jwtSecret);
            res.json({
                token: token
            });
          } else {
              res.sendStatus(401);
          }
        });
  } else {
      res.sendStatus(401);
  }
});
module.exports = router;
