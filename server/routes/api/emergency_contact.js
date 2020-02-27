var express = require('express');
var router = express.Router();
const EmergencyContactService = require('../../services/emergency_contact.service');

const emergencyContactService = new EmergencyContactService();

/********** These are all mounted to /api/emergency *********/

//get all emergency contacts
router.get('/', function(req,res,next) {
    emergencyContactService
        .getAll()
        .then(emergencyContacts => {
            res.json(emergencyContacts)
        });
});


//get a specific emergency contact
router.get('/:id', function(req,res,next) {
    emergencyContactService
        .get(req.params.id)
        .then(emergencyContact => res.json(emergencyContact))
});

//create emergency contact
router.post('/', function(req,res,next){
    let emergencyContact = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        relationship: req.body.relationship,
        contact_no: req.body.contact_no,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip_code: req.body.zip_code,
        employee_id: 1 //todo
    };
    emergencyContactService
        .create(emergencyContact)
        .then(id => res.json(id))
});


//update the emergency contact
router.put('/:id', function(req,res,next){
    let emergencyContact = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        relationship: req.body.relationship,
        contact_no: req.body.contact_no,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip_code: req.body.zip_code,
        employee_id: 1 //todo
    };
    emergencyContactService
        .update(req.params.id,emergencyContact)
        .then(affected => res.json(affected))
});

//delete emergency contact
router.delete('/:id', function(req,res,next){
    emergencyContactService
        .delete(req.params.id)
        .then(affected => res.json(affected))
});


module.exports = router;