-- create_and_populate.sql

-- Create the database (if it doesn't exist)
CREATE DATABASE IF NOT EXISTS recipe_db;
USE recipe_db;

-- Create the ingredients table
CREATE TABLE IF NOT EXISTS ingredients (
    ingredient_id INT PRIMARY KEY AUTO_INCREMENT,
    ingredient_name VARCHAR(255) UNIQUE NOT NULL,
    hover_text TEXT
);

-- Create the recipes table
CREATE TABLE IF NOT EXISTS recipes (
    recipe_id INT PRIMARY KEY AUTO_INCREMENT,
    recipe_name VARCHAR(255) NOT NULL,
    protein_type VARCHAR(255) NOT NULL,
    time_required INT,
    overview TEXT,
    instructions TEXT
);

-- Create the recipe_ingredients table (junction table)
CREATE TABLE IF NOT EXISTS recipe_ingredients (
    recipe_id INT,
    ingredient_id INT,
    quantity VARCHAR(255),
    PRIMARY KEY (recipe_id, ingredient_id),
    FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id)
);


-- Insert initial ingredients
INSERT INTO ingredients (ingredient_name, hover_text) VALUES
    ('Granola', 'Originated in the United States in the late 19th century.'), -- 1
    ('Honey', 'Ancient Egyptians used honey as an embalming fluid and a dressing for wounds.'), -- 2
    ('Banana', 'My favorite fruit.'), -- 3
    ('Fresh fruit', 'Always wash fresh fruits thoroughly before eating.'), -- 4
    ('Shredded coconut', 'Coconuts are native to the coastal areas of Southeast Asia.'), -- 5
    ('Chia seeds', 'Chia seeds were a staple food for the Aztecs and Mayans.'), -- 6
    ('Nuts', 'Nuts are a good source of healthy fats and protein.'), -- 7
    ('Chocolate chips', 'Invented by Ruth Wakefield in 1937.'), -- 8
    ('Chicken thighs', 'Dark meat is juicier and more flavorful than white meat.'), -- 9
    ('All-purpose flour', 'A versatile flour used in baking and cooking.'), -- 10
    ('Salt', 'Salt was once used as currency in ancient Rome.'), -- 11
    ('Pepper', 'Black pepper is known as the "king of spices".'), -- 12
    ('Bread crumbs', 'Bread crumbs can be used to add texture to dishes.'), -- 13
    ('Eggs', 'Eggs are a common ingredient used in cooking and baking.'), -- 14
    ('Vegetable oil', 'Vegetable oil is extracted from plants.'), -- 15
    ('Paprika', 'Paprika is made from ground dried red peppers and is rich in vitamin C.'), -- 16
    ('Cod', 'Cod is a popular fish in British cuisine, often used in fish and chips.'), -- 17
    ('Garlic powder', 'Garlic powder is a convenient alternative to fresh garlic.'), -- 18
    ('Beer', 'Beer is one of the oldest beverages produced by humans, dating back to at least the 5th millennium BC.'), -- 19
    ('Acai puree', 'Acai berries are native to the Amazon rainforest.'), -- 20
    ('Almond milk', 'Almond milk is a plant-based alternative to dairy milk.'); -- 21

-- Insert initial recipes
INSERT INTO recipes (recipe_name, protein_type, time_required, overview, instructions) VALUES
    ('Beer-Battered Fish', 'Fish', 30, 
    'Awesome BEER fish. Truly delectable.',
                                    '
                                    1. Gather ingredients.; 
                                    2. Heat oil in a deep fryer to 365 degrees F (185 degrees C). Rinse cod fillets, pat dry, and season with salt and pepper.;
                                    3.  Mix flour, garlic powder, paprika, salt, and pepper in a large bowl; add egg and stir well to combine. Gradually mix in enough beer to make a thin batter.;
                                    4. Dip cod fillets into the batter to coat. Carefully lower fillets, one at a time, into the hot oil.;
                                    5. Fry several fillets at a time, turning once, until cooked through and golden brown, about 2 minutes per side.;
                                    6. Drain on paper towels. Repeat to cook remaining fillets. Serve warm.
                                    '),
    ('Oven-Fried Chicken', 'Chicken', 75, 
    'A simple classic! God Bless!.', 
                                    '
                                    1. Gather ingredients.;
                                    2. Preheat oven to 350 degrees F (175 degrees C).;
                                    3. Place flour in a shallow plate or bowl and season with salt and pepper to taste. Put bread crumbs in another shallow plate or bowl and beat eggs in another bowl.;
                                    4. Dredge chicken piece by piece in the flour, then the egg, then the bread crumbs, until all pieces are coated.;
                                    5. Pour oil into a large baking dish; add the breaded chicken thighs and sprinkle with paprika to taste.;
                                    6. Bake in the preheated oven for 30 minutes, then turn pieces over and bake for another 30 minutes. Remove from the oven and drain on paper towels.
                                    '),
    ('Acai Bowl', 'Vegetarian', 5, 
    'For you vegetarian scum out there! Just kidding, I love you all.', 
                                    '      
                                    1. Gather ingredients.;
                                    2. Slightly thaw the frozen acai puree, either by soaking it in warm water for a few minutes or placing it in the refrigerator overnight.;
                                    3. Add acai, your liquid of choice, banana, and any other fruits to a high-speed blender.;;
                                    4. Blend until all the frozen chunks are gone and the mixture is thick and smooth.;
                                    5. Spoon the mixture into a bowl, top with your desired toppings, and serve immediately.
                                    ');

-- Insert relationships in recipe_ingredients
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity) VALUES
    (1, 15, '2 quarts'),  
    (1, 17, '4 ounce'),  
    (1, 11, 'to taste'),  
    (1, 12, 'to taste'), 
    (1, 10, '1 cup'),  
    (1, 18, '2 tbsp'), 
    (1, 14, '1 large'), 
    (1, 19, '12 fl. oz.'),  
    (2, 9, '12 pieces'), 
    (2, 10, '1 cup'),
    (2, 11, 'to taste'),  
    (2, 12, 'to taste'), 
    (2, 13, '1 cup'),  
    (2, 14, '3'), 
    (2, 15, '1/2 cup'),  
    (2, 16, '1 tsp'), 
    (3, 20, '1 cup'), 
    (3, 21, '1/4 cup'),  
    (3, 4, '1/2 cup'), 
    (3, 3, '1'),  
    (3, 2, 'to taste'),
    (3, 5, 'to taste'),
    (3, 6, 'to taste'),
    (3, 7, 'to taste'),
    (3, 8, 'to taste');
