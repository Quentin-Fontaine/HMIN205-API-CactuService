const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.route('/')
    .get(userCtrl.getAllUsers);

router.route('/:job')
    .get(userCtrl.getUsersJob);

router.param('userId', userCtrl.getUserMiddleware);
router.route('/:userId')
    .get(userCtrl.getUser)
    .delete(userCtrl.deleteUser);

module.exports = router;
