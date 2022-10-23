const path = require('path');
const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath),
    mongo: {
        db: 'mongodb://localhost/eventsCalendarApp',
        options: {useNewUrlParser: true}
    },
    facebook: {
        appId: '1173344116866876',
        appSecret: process.env.FACEBOOK_APP_SECRET,
    },
};
