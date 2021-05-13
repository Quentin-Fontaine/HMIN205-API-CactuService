const express = require('express');
const router = express.Router();

const slotCtrl = require('../controllers/slot');

router.route('/')
    .get(slotCtrl.getAllSlots)
    .post(slotCtrl.addSlot);

router.param('slotId', slotCtrl.getSlotMiddleware);
router.route('/:slotId')
    .get(slotCtrl.getSlot)
    .put(slotCtrl.updateSlot)
    .delete(slotCtrl.deleteSlot);

module.exports = router;
