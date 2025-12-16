const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    objectType: {
        type: String,
        required: true,
        trim: true,
    },
    itemPhoto: {
        type: String, // Will store the file path or URL for the item photo
        required: true,
    },
    locationPhoto: {
        type: String, // Will store the file path or URL for the location photo
        required: false, // Make it optional if not always required
    },
    lostDate: {
        type: Date,
    },
    foundDate: {
        type: Date,
    },
    specificLocation: {
        type: String,
        required: true,
        trim: true,
    },
    contactNumber: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /\d{10}/.test(v); // Simple validation for a 10-digit number
            },
            message: (props) => `${props.value} is not a valid contact number!`,
        },
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['lost', 'found'], // Example: can only be 'lost' or 'found'
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Add a custom validator
userSchema.pre('validate', function (next) {
    if (this.type === 'lost' && !this.lostDate) {
        return next(new Error('lostDate is required for type "lost"'));
    }
    if (this.type === 'found' && !this.foundDate) {
        return next(new Error('foundDate is required for type "found"'));
    }
    next();
});

const UserModel = mongoose.model('User ', userSchema);
module.exports = UserModel;