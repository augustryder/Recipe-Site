
const express = require('express');
const router = express.Router();
const model = require('../models/recipeModel');

const testRecipe = 
{
    name: 'Test Recipe',
    protein: 'Chicken',
    time: '75 minutes',
    description: 'This is a test recipe.',
    ingredients: ['Ingredient 1', 'Ingredient 2', 'Ingredient 3'],
    instructions: ['Instruction 1', 'Instruction 2', 'Instruction 3']
};

testRecipes = {
    chicken: [testRecipe, testRecipe, testRecipe],
    fish: [testRecipe, testRecipe, testRecipe],
    vegetarian: [testRecipe, testRecipe, testRecipe]
}

router.get('/', (req, res) => {
    res.render('pages/home');
});

router.get('/recipes', async (req, res) => {
    recipes = await model.getRecipes();
    console.log(recipes);
    res.render('pages/recipeList', {recipes: recipes});
});

router.get('/recipe/:id', async (req, res) => {
    const recipeId = req.params.id.replace(':', '');
    console.log(recipeId);
    const recipe = await model.getRecipe(recipeId);
    const ingredients = await model.getIngredients(recipeId);
    console.log(recipe);
    console.log(ingredients);
    res.render('pages/recipe', {recipe: recipe, ingredients: ingredients});

});

router.get('/add-recipe', (req, res) => {
    res.render('pages/addRecipe');
});

module.exports = router;
