
const mongoose = require('mongoose')
const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required:true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    cuisine: {
        type: String,
        required:true
    },
    difficulty: {
        type: String,
        required:true
    },
    prepTime: {
        type: Number,
        required:true
    },
    cookTime: {
        type: Number,
        required:true
    },
    servings: {
        type: Number,
        required:true
    },
    imageUrl: {
        type: String,
        required:true
    },
    ingredients: [{
        name: String,
        quantity: Number,
        units: Number
    }],
    instructions: [{
        steps: Number,
        descriptions: String
    }]
})
const Recipe = mongoose.model('Recipe', recipeSchema)
module.exports = Recipe
