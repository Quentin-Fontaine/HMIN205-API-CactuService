const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.route('/')
    .get(userCtrl.getAllUsers);

router.route('/suppliers')
    .get(userCtrl.getSupplierUsers);

router.param('userId', userCtrl.getUserMiddleware);
router.route('/:userId')
    .get(userCtrl.getUser)
    .put(userCtrl.updateUser)
    .delete(userCtrl.deleteUser);

router.route('/:userId/unbookedslots')
    .get(userCtrl.getAvailableSlotsOfUser);

router.route('/:userId/bookings')
    .get(userCtrl.getBookingsOfUser);

module.exports = router;
