const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const auth = require("../middleware/auth");
const mongoose = require("mongoose");

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
        // const event = await Event.findById(req.params.id);
        // await Event.findByIdAndDelete(req.params.id) ;
        // if (event.owner._id !== req.user._id) {
        //     return res.status(401).send({message: 'Wrong user id'});
        // }
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

