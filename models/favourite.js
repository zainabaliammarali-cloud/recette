// models/favourite.js
const mongoose = require('mongoose')
const favoriteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    }
})
const Favorite = mongoose.model('Favorite', favoriteSchema)
module.exports = Favorite