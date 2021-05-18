const Job = require('../models/job');
const User = require('../models/user');

exports.getAllJobs = (req, res, next) => {
    Job.find()
        .then(jobs => res.status(201).json(jobs))
        .catch(error => res.status(500).json({ error }));
};

exports.addJob = (req, res, next) => {
    delete req.body._id;
    const job = new Job({
        ...req.body
    });
    job.save()
        .then(() => res.status(201).json({ message: 'Job created !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.getJobMiddleware = (req, res, next, jobId) => {
    Job.findOne({ _id: jobId })
        .then(job => {
            if (!job) {
                return res.status(404).json({ error: 'Job not found !' });
            }
            req.job = job;
            return next();
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getJob = (req, res, next) => {
    return res.status(200).json(req.job);
};

exports.updateJob = (req, res, next) => {
    Job.updateOne({ _id: req.job._id }, { ...req.body, _id: req.job._id })
        .then(() => res.status(200).json({ message: 'Job modified !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteJob = (req, res, next) => {
    Job.deleteOne({ _id: req.job._id })
        .then(() => res.status(204).send())
        .catch(error => res.status(500).json({ error }));
};

exports.getUsersByJob = (req, res, next) => {
    User.find({ job: req.job._id })
        .then(users => res.status(201).json(users))
        .catch(error => res.status(500).json({ error }));
};
