const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const config = require('./config');

const User = require('./models/User');
const Event = require('./models/Event');

const run = async () => {
    await mongoose.connect(config.mongo.db);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [smn, me, user1, user2] = await User.create({
        email: 'smn@gmail.com',
        password: 'smn',
        token: nanoid(),
        displayName: 'SomeOne',
        friends: [],
    }, {
        email: 'me@gmail.com',
        password: 'me',
        token: nanoid(),
        displayName: 'Me',
        friends: [],
    }, {
        email: 'user1@gmail.com',
        password: 'user1',
        token: nanoid(),
        displayName: 'User1',
        friends: [],
    }, {
        email: 'user2@gmail.com',
        password: 'user2',
        token: nanoid(),
        displayName: 'User2',
        friends: [],
    });

    await Event.create({
        title: 'Halloween party',
        date: new Date().toISOString(),
        duration: 4,
        owner: smn._id
    }, {
        title: 'Do Homework',
        date: new Date().toISOString(),
        duration: 5,
        owner: me._id
    }, {
        title: 'Go to gym',
        date: new Date().toISOString(),
        duration: 1,
        owner: me._id
    }, {
        title: 'Cook smth delicious',
        date: new Date().toISOString(),
        duration: 2,
        owner: user1._id
    }, {
        title: 'Watch TV',
        date: new Date().toISOString(),
        duration: 1,
        owner: user2._id
    });

    await mongoose.connection.close();
};

run().catch(console.error);
