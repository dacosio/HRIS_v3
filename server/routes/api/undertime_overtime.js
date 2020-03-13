var express = require("express");
var router = express.Router();
const UndertimeOvertimeService = require("../../services/undertime_overtime.service");

const undertimeOvertimeService = new UndertimeOvertimeService();

/********** These are all mounted to /api/time *********/

//get all times
router.get("/", function(req, res, next) {
  undertimeOvertimeService.getAll().then(times => {
    res.json(times);
  });
});

//get time requests
router.get("/timeRequest", function(req, res, next) {
  undertimeOvertimeService.getTimeForApproval().then(time => res.json(time));
});


router.put("/approveTimeRequest/:id", function(req,res,next) {
  undertimeOvertimeService
    .get(req.params.id)
    .then(timeObj => {
      console.log("time obj", timeObj);
      if(timeObj && timeObj.length > 0) {
        timeObj[0].status = 1; // 0 - pending , 1 - accepted, 2 - declined
      }
      else {
        return res.status(404)
      }
      console.log("time", timeObj);

      return undertimeOvertimeService
        .update(timeObj[0].id,timeObj[0])
    })
    .then(time => {
      return res.json(time);
    });
});

router.put("/declineTimeRequest/:id", function(req,res,next) {
  undertimeOvertimeService
    .get(req.params.id)
    .then(timeObj => {
      console.log("time obj", timeObj);
      if(timeObj && timeObj.length > 0) {
        timeObj[0].status = 2; // 0 - pending , 1 - accepted, 2 - declined
      }
      else {
        return res.status(404)
      }
      console.log("time", timeObj);

      return undertimeOvertimeService
        .update(timeObj[0].id,timeObj[0])
    })
    .then(time => {
      return res.json(time);
    });
});

//create time
router.post("/", function(req, res, next) {
  let time = {
    date_filed: req.body.date_filed,
    from_time: req.body.from_time,
    to_time: req.body.to_time,
    reason: req.body.reason,
    time_type: req.body.time_type,
    created_by: req.body.created_by //todo
  };
  undertimeOvertimeService.create(time).then(id => res.json(id));
});

//update the time
router.put("/:id", function(req, res, next) {
  let time = {
    date_filed: req.body.date_filed,
    from_time: req.body.from_time,
    to_time: req.body.to_time,
    reason: req.body.reason,
    created_by: 1 //todo
  };
  undertimeOvertimeService
    .update(req.params.id, time)
    .then(affected => res.json(affected));
});

//delete time
router.delete("/:id", function(req, res, next) {
  undertimeOvertimeService
    .delete(req.params.id)
    .then(affected => res.json(affected));
});

module.exports = router;
