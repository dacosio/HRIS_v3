var express = require('express');
var router = express.Router();
const ApplicantService = require('../../services/applicant.service');

const applicantService = new ApplicantService();

/********** These are all mounted to /api/applicants *********/

//get all applicants
router.get('/', function(req,res,next) {
    applicantService
        .getAllApplicantsView()
        .then(applicants => {
            res.json(applicants)
        });
});


//get a specific applicant
router.get('/:id', function(req,res,next) {
    applicantService
        .get(req.params.id)
        .then(applicant => res.json(applicant))
});

//create applicant
router.post('/', function(req,res,next){
    let applicant = {
        date: req.body.date,
        time: req.body.time,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        contact_no: req.body.contact_no,
        department_id: req.body.department_id,
        created_by: 1 //todo
    };
    applicantService
        .create(applicant)
        .then(id => applicantService.get(parseInt(id)))
        .then(obj => res.json(obj))
});


//update the applicant
router.put('/:id', function(req,res,next){
    let applicant = {
        date: req.body.date,
        time: req.body.time,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        contact_no: req.body.contact_no,
        department_id: req.body.department_id,
        created_by: 1 //todo
    };
    applicantService
        .update(req.params.id,applicant)
        .then(id => applicantService.get(parseInt(id)))
        .then(obj => res.json(obj))
});

//delete applicant
router.delete('/:id', function(req,res,next){
    applicantService
        .delete(req.params.id)
        .then(affected => res.json(affected))
});


module.exports = router;