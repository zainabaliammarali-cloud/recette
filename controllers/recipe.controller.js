const router = require("express").Router()
const multer = require("multer")
const Recipe = require('../models/Recipe')
const Favorite = require("../models/favourite")
const upload = multer({ des: 'uploads' })


router.get('/allRecipes', async (req, res) => {
  try {
    const allRecipes = await Recipe.find().populate('author')
    res.render('Recipe/all-recipes.ejs', { recipes: allRecipes })
  } catch (err) {
    console.log(err)
  }
})

router.get('/newRecipe', (req, res) => {
  res.render('Recipe/recipe-create.ejs')
})


router.post('/newRecipe', upload.single('imageUrl'), async (req, res) => {
  try {
    req.body.author = req.session.user._id
    const createdRecipe = await Recipe.create(req.body)
    res.redirect('/')
  }
  catch (err) {
    console.log(err)
  }
})


router.get('/:id/recipeDetails', async (req, res) => {
  try {
    const foundRecipe = await Recipe.findById(req.params.id).populate('author')
    const isFavorited = await Favorite.findOne({
      user: req.session.user._id,
      recipe: req.params.id
    })
    res.render('Recipe/recipe-details.ejs', { recipe: foundRecipe, isFavorited })
  } catch (err) {
    console.log(err)
  }

})

router.delete('/:id/recipeDetails', async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id)
    res.redirect('/recipe/allRecipes')
  }
  catch (err) {
    console.log(err)
  }
})


router.get('/:id/recipeDetails/edit', async (req, res) => {
  try {
    const foundRecipe = await Recipe.findById(req.params.id)
    res.render('recipe/edit-recipe.ejs', { recipe: foundRecipe })
  }
  catch (err) {
    console.log(err)
  }
})

router.put('/:id/recipeDetails/edit', upload.single('imageUrl'), async (req, res) => {
  try {
    if(req.file.filename){
      req.body.imageUrl = req.file.filename
    }
    await Recipe.findByIdAndUpdate(req.params.id, req.body)
    res.redirect('/recipe/allRecipes')
  }
  catch (err) {
    console.log(err)
  }
})



router.post('/:id/favorite', async(req,res)=>{
  try{
    const foundFavorite = await Favorite.findOne({
      user: req.session.user._id,
      recipe: req.params.id
    })

    if(foundFavorite){
      const deletedFavorite = await Favorite.deleteOne({
      user: req.session.user._id,
      recipe: req.params.id
    })
    }
    else{
    const favoriteCreate = await Favorite.create({
      user: req.session.user._id,
      recipe: req.params.id
    })

    }

    res.redirect(`/recipe/${req.params.id}/recipeDetails`)
  }
  catch(err){
    console.log(err)
  }
})

module.exports = router;