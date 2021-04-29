const express = require('express');
const router = express.Router();

const slotCtrl = require('../controllers/slot');

router.route('/')
    .get(slotCtrl.getAllSlots)
    .post(slotCtrl.addSlot);

router.param('slotId', slotCtrl.getSlotMiddleware);
router.route('/:slotId')
    .get(slotCtrl.getSlot)
    .delete(slotCtrl.deleteSlot);

module.exports = router;
