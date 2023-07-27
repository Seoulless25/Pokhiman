const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    rating: { 
        type: Number,
        min: 1,
        max:10,
        default: 5
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    team: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
        required: true 
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema)