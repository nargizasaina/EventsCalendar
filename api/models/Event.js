const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    title: {
        required: true,
        type: String
    },
    datetime: {
        required: true,
        type: Date
    },
    duration: {
        required: true,
        type: String
    },
    owner: {
        type:Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;