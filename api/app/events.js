const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const auth = require("../middleware/auth");
const mongoose = require("mongoose");
const User = require("../models/User");

router.get('/', auth, async (req, res) => {
    const sort = {date: -1};
    try{
        if (req.query.events) {
            const users = await User.find({friends: req.user._id});
            const events = await Event
                .find({owner: {$in: users}})
                .sort(sort)
                .populate('owner');
                res.send(events);
            } else {
                const events = await Event
                    .find({owner: req.user._id})
                    .sort(sort)
                    .populate('owner');
                res.send(events);
            }
    } catch {
        res.sendStatus(500);
    }
});

router.post('/', auth, async (req, res) => {
    try{
        const {title, duration, date} = req.body;

        const eventData = {
            title,
            duration,
            owner: req.user._id,
            date
        };

        const event = new Event(eventData);
        await event.save();
        res.send(event);
    } catch (e) {
        res.status(400).send({error: e.errors});
    }
});

router.delete('/:id', auth, async (req, res) => {
    try{
        console.log(req.params.id);

        const id = mongoose.mongo.ObjectId(req.params.id);
        const event = await Event.findOne({
            owner: req.user._id,
            _id: id
        });

        if (!event) {
            return res.status(404).send({error: 'Task is not found!'});
        }

        await Event.deleteOne(event);

        res.send('Event is deleted successfully!');
    }catch {
        res.sendStatus(500);
    }
});

module.exports = router;

