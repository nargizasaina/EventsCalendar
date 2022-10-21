const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const exitHook = require('async-exit-hook');

const config = require('./config');

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);
    app.listen(() => {
        console.log('Server started on port', port);
    });

    exitHook(() => {
        mongoose.disconnect();
        console.log('Mongoose disconnected');
    });
};

run().catch(e => console.error(e));
