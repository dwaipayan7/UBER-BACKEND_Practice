import mongoose from 'mongoose';

const captainSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('Captain', captainSchema);

export default User; 