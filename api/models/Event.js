const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    title: {
        required: true,
        type: String
    },
    date: {
        required: true,
        type: Date,
        min: new Date(),
    },
    duration: {
        required: true,
        type: Number,
        min: 0
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;