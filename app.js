
const express = require('express');
const app = express();
const port = 3000; // Or any port you prefer

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static('public'));
// app.use(express.urlencoded({ extended: true })); // Parse form data (important later)

const pool = require('./models/recipeModel'); // Import the pool
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Database connection successful!');
        connection.release(); // Release the connection back to the pool
    } catch (err) {
        console.error('Database connection failed:', err);
    }
}
testConnection()

// Routes (will be moved to routes/recipeRoutes.js later)
app.get('/', (req, res) => {
    res.render('home'); // Render the home.ejs template
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
