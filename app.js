
const express = require('express');
const app = express();
const port = 3000; // Or any port you prefer

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // Parse form data

app.use('/', require('./routes/recipeRoutes')); // Use the routes

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
