const express = require('express');
const router = express.Router();

const jobCtrl = require('../controllers/job');

router.route('/')
    .get(jobCtrl.getAllJobs)
    .post(jobCtrl.addJob);

router.param('jobId', jobCtrl.getJobMiddleware);
router.route('/:jobId')
    .get(jobCtrl.getJob)
    .put(jobCtrl.updateJob)
    .delete(jobCtrl.deleteJob);

router.route('/:jobId/users')
    .get(jobCtrl.getUsersByJob);

module.exports = router;
