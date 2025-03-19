
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

router.get('/add-recipe', async (req, res) => {
    const ingredients = await model.getAllIngredients();
    res.render('pages/addRecipe', { ingredients: ingredients });
});

router.post('/add-recipe', async (req, res) => {
    try {
        const { name, proteinType, time, overview, instructions, ingredients } = req.body;
        const ingredientIds = Array.isArray(ingredients) ? ingredients : [ingredients];

        await model.addRecipe(name, proteinType, time, overview, instructions, ingredientIds);
        res.redirect('/recipes');

    } catch (err) {
        console.error(err);
        throw err;
    }
});

module.exports = router;
