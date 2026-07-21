const mongoose = require('mongoose')
const reviewSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    },
    ratings: {
        type: Number
    },
    comments: {
        type: String
    }
})
const Review = mongoose.model('Review', reviewSchema)
module.exports = Review