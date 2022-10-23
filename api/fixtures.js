const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const config = require('./config');

const User = require('./models/User');

const run = async () => {
    await mongoose.connect(config.mongo.db);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    await User.create({
        email: 'me@gmail.com',
        password: 'me',
        token: nanoid(),
        displayName: 'Me'
    }, {
        email: 'user@gmail.com',
        password: 'user',
        token: nanoid(),
        displayName: 'User'
    });

    await mongoose.connection.close();
};

run().catch(console.error);
