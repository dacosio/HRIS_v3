var express = require("express");
var router = express.Router();
const LeaveService = require("../../services/leave.service");

const leaveService = new LeaveService();

/********** These are all mounted to /api/leaves *********/

//get all leaves
router.get("/", function(req, res, next) {
  leaveService.getAll(parseInt(req.user.id))
  .then(leaves => {
    res.json(leaves);
  });
});

router.get("/leaveRequest", function(req, res, next) {
  console.log("getting requests for : ", req.user.id);
  leaveService.getLeaveforApproval(parseInt(req.user.id))
  .then(leaves => {
    res.json(leaves);
  });
});

router.put("/approveLeaveRequest/:id", function(req,res,next) {
  leaveService
    .get(req.params.id)
    .then(leaveObj => {
      console.log("leave obj", leaveObj);
      if(leaveObj && leaveObj.length > 0) {
        leaveObj[0].status = 1; // 0 - pending , 1 - accepted, 2 - declined
      }
      else {
        return res.status(404)
      }
      console.log("leave", leaveObj);

      return leaveService
        .update(leaveObj[0].id,leaveObj[0])
    })
    .then(leave => {
      return res.json(leave);
    });
});

router.put("/declineLeaveRequest/:id", function(req,res,next) {
  leaveService
    .get(req.params.id)
    .then(leaveObj => {
      console.log("leave obj", leaveObj);
      if(leaveObj && leaveObj.length > 0) {
        leaveObj[0].status = 2; // 0 - pending , 1 - accepted, 2 - declined
      }
      else {
        return res.status(404)
      }
      console.log("leave", leaveObj);

      return leaveService
        .update(leaveObj[0].id,leaveObj[0])
    })
    .then(leave => {
      return res.json(leave);
    });
});

router.put("/leaveRequest/:id", function(req, res, next) {
  let leave = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    reason: req.body.reason,
    from_date: req.body.from_date,
    to_date: req.body.to_date,
    type: req.body.type,
    status: req.body.status,
    isDeleted: req.body.isDeleted,
    created_by: req.user.id
  };
  leaveService.update(req.params.id, leave).then(leaves => {
    res.json(leaves);
  });
});

//get a specific leaves
router.get("/:id", function(req, res, next) {
  leaveService.get(req.params.id).then(leave => res.json(leave));
});

//create leaves
router.post("/", function(req, res, next) {
  let leave = {
    leave_type: req.body.leave_type,
    from_date: req.body.from_date,
    to_date: req.body.to_date,
    reason: req.body.reason,
    created_by: req.user.id //todo
  };
  leaveService.create(leave).then(id => res.json(id));
});

//update the leaves
router.put("/:id", function(req, res, next) {
  let leave = {
    leave_type: req.body.leave_type,
    from_date: req.body.from_date,
    to_date: req.body.to_date,
    reason: req.body.reason,
    created_by: req.user.id //todo
  };
  leaveService
    .update(req.params.id, leave)
    .then(affected => res.json(affected));
});

//delete leaves
router.delete("/:id", function(req, res, next) {
  leaveService.delete(req.params.id).then(affected => res.json(affected));
});

module.exports = router;
