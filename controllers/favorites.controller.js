const router = require("express").Router()
const Favorite = require('../models/favourite')

router.get('/', async (req,res)=>{
    try{
      const allFavorites = await Favorite.find({user: req.session.user._id}).populate('recipe')
      res.render('favorites/favorites.ejs', {favorites: allFavorites})
    }
    catch(err){
      console.log(err)
    }
})


router.get('/addFavorite', async (req,res)=>{
    try{
      await Favorite.create({
        user: req.session.user._id,
        recipe: req.params.recipeId
      })
      res.redirect('/recipe')
    }
    catch(err){
      console.log(err)
    }
})
  
router.delete('/:id/removeFavorite', async (req, res)=>{
    try{
      await Favorite.findByIdAndDelete(req.body.id)
      res.redirect('/favorits')
    }
    catch(err){
      console.log(err)
    }
})


module.exports = router;