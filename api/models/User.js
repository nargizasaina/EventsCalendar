import mongoose from "mongoose";
import bcrypt from "bcrypt";
import {nanoid} from "nanoid";
const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        required: true,
        unique: true,
        type: String,
        validate: {
            validator: async value => {
                const user = await User.findOne({email: value});
                if (user) return false;
            },
            message: 'The user is already registered!',
        },
    },
    password: {
        required: true,
        type: String
    },
    facebookId: String,
    token: {
        type: String,
        required: true
    },
});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.password;
        return ret;
    }
});

UserSchema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
    this.token = nanoid();
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
