
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('pages/home');
});

router.get('/recipes', (req, res) => {
    res.render('pages/recipeList');
});

router.get('/recipe/:id', (req, res) => {
    res.render('pages/recipe');
});

router.get('/add-recipe', (req, res) => {
    res.render('pages/addRecipe');
});

module.exports = router;
