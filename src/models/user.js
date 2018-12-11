import mongoose from 'mongoose';
import { hash } from 'bcryptjs';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        validate: {
            validator: email => User.doesntExist({ email }),
            message: ({ value }) => `Email ${value} has already been taken.`
        }
    },
    username: {
        type: String,
        validate: {
            validator: username => User.doesntExist({ username }),
            message: ({ value }) => `Username ${value} has already been taken.`
        }
    },
    name: String,
    password: String,
}, {
    timestamps: true //create 'createdAt' and 'updatedAt'
});

userSchema.statics.doesntExist = async function(options) {
    return await this.where(options).countDocuments() === 0
};

userSchema.pre('save', async function () {
    if(this.isModified('password')) {
        this.password = await hash(this.password, 10) //args.password
    }
});

const User = mongoose.model('User', userSchema);
export default User;