const User = require('../models/user');

exports.getAllUsers = (req, res, next) => {
    User.find()
        .then(users => res.status(201).json(users))
        .catch(error => res.status(500).json({ error }));
};

exports.getUsersJob = (req, res, next) => {
    User.find({ job: req.params.job })
        .then(users => res.status(201).json(users))
        .catch(error => res.status(500).json({ error }));
};

exports.getUserMiddleware = (req, res, next, userId) => {
    User.findOne({ _id: userId })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            req.user = user;
            return next();
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getUser = (req, res) => {
    return res.status(200).json(req.user);
};

exports.deleteUser = (req, res) => {
    User.deleteOne({ _id: req.body.userId })
        .then(() => res.status(204).send())
        .catch(error => res.status(500).json({ error }));
};
