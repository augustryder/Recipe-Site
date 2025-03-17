
const express = require('express');
const router = express.Router();
const model = require('../models/recipeModel');

router.get('/', (req, res) => {
    res.render('pages/home');
});

router.get('/recipes', async (req, res) => {
    recipes = await model.getRecipes();
    res.render('pages/recipeList', {recipes: recipes});
});

router.get('/recipe/:id', async (req, res) => {
    const recipeId = req.params.id.replace(':', '');
    const recipe = await model.getRecipe(recipeId);
    const ingredients = await model.getIngredients(recipeId);
    res.render('pages/recipe', {recipe: recipe, ingredients: ingredients});
});

router.get('/add-recipe', (req, res) => {
    res.render('pages/addRecipe');
});

module.exports = router;
