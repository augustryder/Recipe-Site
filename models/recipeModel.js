require('dotenv').config(); // Load environment variables

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true, // Wait if all connections are in use
    connectionLimit: 10,     // Maximum number of connections
    queueLimit: 0           // Unlimited queue length (0 = unlimited)
});

async function getRecipes(protein_type) {
    try {
        const connection = await pool.getConnection();
        let recipes = [];
        if (protein_type) {
            const [rows] = await connection.query('SELECT * FROM recipes WHERE protein_type = ?', protein_type);
            recipes = rows;
        } else {
            const [rows] = await connection.query('SELECT * FROM recipes');
            recipes = rows;
        }
        connection.release();
        return recipes;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function getRecipe(recipe_id) {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM recipes WHERE recipe_id = ?', recipe_id);
        connection.release();
        return rows[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function getIngredients(recipe_id) {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM recipe_ingredients WHERE recipe_id = ?', recipe_id);
        let ingredients = [];
        for (const row of rows) {
            const [ingredient] = await connection.query('SELECT * FROM ingredients WHERE ingredient_id = ?', row.ingredient_id);
            ingredients.push(ingredient[0]);
        }
        connection.release();
        return ingredients;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function getAllIngredients() {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM ingredients');
        connection.release();
        return rows;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function addRecipe(name, proteinType, time, overview, instructions, ingredientIds) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const [recipeResult] = await connection.query(
            'INSERT INTO recipes (recipe_name, protein_type, time_required, overview, instructions) VALUES (?, ?, ?, ?, ?)',
            [name, proteinType, Number(time), overview, instructions]
        );
        const recipeId = recipeResult.insertId;

        for (const ingredientId of ingredientIds) {
            await connection.query(
                'INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity) VALUES (?, ?, "to taste")', 
                [recipeId, Number(ingredientId)]
            );
        }

        await connection.commit();
        return recipeId;
    } catch (err) {
        console.error(err);
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }
}

exports.pool = pool;
exports.getRecipes = getRecipes;
exports.getRecipe = getRecipe;
exports.getIngredients = getIngredients;
exports.getAllIngredients = getAllIngredients;
exports.addRecipe = addRecipe;
