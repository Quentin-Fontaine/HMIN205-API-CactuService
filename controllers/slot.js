const Slot = require('../models/slot');

exports.getAllSlots = (req, res, next) => {
    Slot.find()
        .then(slots => res.status(201).json(slots))
        .catch(error => res.status(500).json({ error }));
};

exports.addSlot = (req, res, next) => {
    delete req.body._id;
    const slot = new Slot({
        ...req.body
    });
    slot.save()
        .then(() => res.status(201).json({ message: 'Slot created !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.getSlotMiddleware = (req, res, next, slotId) => {
    Slot.findOne({ _id: slotId })
        .then(slot => {
            if (!slot) {
                return res.status(404).json({ error: 'Slot not found' });
            }
            req.slot = slot;
            return next();
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getSlot = (req, res) => {
    return res.status(200).json(req.slot);
};

exports.deleteSlot = (req, res) => {
    Slot.deleteOne({ _id: req.body.slotId })
        .then(() => res.status(204).send())
        .catch(error => res.status(500).json({ error }));
};