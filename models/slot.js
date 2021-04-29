const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
    startTime: { type: Date, required: true },
    endingTime: { type: Date, required: true },
    isBooked: { type: Boolean, required: true },
    idSupplier: { type: mongoose.Types.ObjectId, required: true }
});

module.exports = mongoose.model('Slot', slotSchema);
