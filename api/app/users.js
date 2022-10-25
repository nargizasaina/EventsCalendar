const express = require('express');
const axios = require("axios");
const router = express.Router();
const User = require('../models/User');
const config = require('../config');
const {nanoid} = require("nanoid");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");

router.get('/friends', auth, async (req, res) => {
    try{
        const user = await req.user.populate('friends', 'email displayName');
        res.send(user.friends);
    } catch {
        res.sendStatus(500);
    }
});

router.post('/', async (req, res) => {
    const {email, password, displayName} = req.body;

    const userData = {email, password, displayName};

    try{
        const user = new User(userData);
        user.generateToken();
        await user.save();
        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/sessions', async (req, res) => {
    const user = await User.findOne({email: req.body.email});

    if (!user) {
        return res.status(401).send({message: 'Credentials are wrong!'});
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
        return res.status(401).send({message: 'Credentials are wrong!'});
    }

    user.generateToken();
    await user.save({validateBeforeSave: false});
    res.send(user);
});

router.post('/facebookLogin', async (req, res) => {
    const inputToken = req.body.accessToken;
    const accessToken = config.facebook.appId + '|' + config.facebook.appSecret;

    const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;
    try{
        const response = await axios.get(debugTokenUrl);

        if (response.data.data.error) {
            return res.status(401).send({message: 'Facebook token incorrect!'});
        }

        if (req.body.id !== response.data.data.user_id) {
            return res.status(401).send({message: 'Wrong user id'});
        }

        let user = await User.findOne({facebookId: req.body.id});

        if (!user) {
            user = new User({
                email: req.body.email,
                password: nanoid(),
                facebookId: req.body.id,
                displayName: req.body.name,
                friends: []
            });
        }

        user.generateToken();
        await user.save({validateBeforeSave: false});

        return res.send(user);
    } catch (e) {
        return res.status(401).send({message: 'Facebook token incorrect!'});
    }
});

router.post('/friends/new', auth, async(req, res) => {
    try{
        const email = req.body.email;
        const friend = await User.findOne({email});

        if (!friend) {
            return res.status(404).send({error: 'The user is not found!'});
        }

        if (req.user.friends.includes(friend._id)) {
            return res.status(400).send({error: 'The user is already invited'});
        }

        req.user.friends.push(friend._id);
        await req.user.save({validateBeforeSave: false});
        return res.send(req.user);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.delete('/friends/:id', auth, async (req, res) => {
    try{
        const id = mongoose.mongo.ObjectId(req.params.id);

        const friendsArray = req.user.friends;
        if (!friendsArray.includes(id)) {
            return res.status(404).send({error: 'The user is not found!'});
        }

        const index = friendsArray.indexOf(id);
        friendsArray.splice(index, 1);
        await req.user.save({validateBeforeSave: false});
        res.send(req.user);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.delete('/sessions', async (req, res) => {
    const token = req.get('Authorization');
    const success = {message: 'Success'};

    if (!token) return res.send(success);

    const user = await User.findOne({token});

    if (!user) return res.send(success);

    user.generateToken();
    await user.save({validateBeforeSave: false});

    res.send({success, user});
});

module.exports = router;