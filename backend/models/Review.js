//models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        feedback: { type: String, required: true },
        likes: { type: Number, default: 0 },
        response: { type: String, default: '' },
        comments: { type: [String], default: [] },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt
);

module.exports = mongoose.model('Review', reviewSchema);


