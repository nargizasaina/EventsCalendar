const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const auth = require("../middleware/auth");

router.get('/', auth, async (req, res) => {
    const sort = {datetime: 1};
    try{
        if (req.query.owner) {
            const events = await Event
                .find({owner: req.query.owner})
                .sort(sort)
                .populate('owner', 'email displayName');
            res.send(events);
        } else {
            const events = await Event
                .find({owner: req.user._id})
                .sort(sort)
                .populate('owner', 'email displayName');
            res.send(events);
        }

    } catch {
        res.sendStatus(500);
    }
});

router.post('/', auth, async (req, res) => {
    try{
        const {title, duration, datetime} = req.body;

        const eventData = {
            title,
            duration,
            owner: req.user._id,
            datetime
        };

        const event = new Event(eventData);
        await event.save();
        res.send(event);
    } catch (e) {
        res.status(400).send({error: e.errors});
    }
});

module.exports = router;

