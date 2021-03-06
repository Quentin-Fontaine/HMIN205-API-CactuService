const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                lastname: req.body.lastname,
                firstname: req.body.firstname,
                birthday: req.body.birthday,
                email: req.body.email.toLowerCase().trim(),
                password: hash,
                role: req.body.role,
                job: req.body.job
            });
            user.save()
                .then(() => res.status(201).json({ message: 'User created !'}))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));   // 500 for server error
};


exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }
        if (!await bcrypt.compare(req.body.password, user.password)) {
            return res.status(404).json({error: 'Incorrect password'});
        }
        return res.status(200).json({
            userId: user._id,
            token: jwt.sign(
                {userId: user._id},
                'RANDOM_TOKEN_SECRET',
                {expiresIn: '24h'}
            )
        });
    } catch (error) {
        return res.status(500).send(error);
    }
};
