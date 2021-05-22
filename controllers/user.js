const User = require('../models/user');
const Slot = require('../models/slot');

exports.getAllUsers = (req, res, next) => {
    User.find()
        .then(users => res.status(201).json(users))
        .catch(error => res.status(500).json({ error }));
};

// exports.getSupplierUsers = (req, res, next) => {
//     const {role} = req.query;
//     return User.find({ role: role }, function(err, users){
//         if (err) {
//             return res.status(500).send(err);
//         }
//         return res.status(200).json(users);
//     });
// }

exports.getSupplierUsers = (req, res, next) => {
    User.find({ role: 'Fournisseur'})
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

exports.updateUser = (req, res) => {
    User.updateOne({ _id: req.user.id }, { ...req.body, _id: req.user.id })
        .then(() => res.status(200).json({ message: 'User modified !' }))
        .catch(error => res.status(500).json({ error }));
};

exports.deleteUser = (req, res) => {
    User.deleteOne({ _id: req.user._id })
        .then(() => res.status(204).send())
        .catch(error => res.status(500).json({ error }));
};

exports.getAvailableSlotsOfUser = (req, res) => {
    Slot.find({ idSupplier: req.user._id, isBooked: false })
        .then(slots => res.status(201).json(slots))
        .catch(error => res.status(500).json({ error }));
};

exports.getBookingsOfUser = (req, res) => {
    Slot.find({ idBooker: req.user._id, isBooked: true })
        .then(slots => res.status(201).json(slots))
        .catch(error => res.status(500).json({ error }));
};
