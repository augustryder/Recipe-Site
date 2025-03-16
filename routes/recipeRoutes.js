
const express = require('express');
const router = express.Router();

const testRecipe = 
{
    name: 'Test Recipe',
    image: 'https://via.placeholder.com/300',
    ingredients: ['Ingredient 1', 'Ingredient 2', 'Ingredient 3'],
    instructions: ['Instruction 1', 'Instruction 2', 'Instruction 3']
};

testRecipes = [testRecipe];

router.get('/', (req, res) => {
    res.render('pages/home');
});

router.get('/recipes', (req, res) => {
    res.render('pages/recipeList', {recipes: testRecipes});
});

router.get('/recipe/:id', (req, res) => {
    res.render('pages/recipe', {recipe: testRecipe});
});

router.get('/add-recipe', (req, res) => {
    res.render('pages/addRecipe');
});

module.exports = router;
