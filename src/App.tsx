import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Recipe } from './models/Recipe';
import RecipeEditor from './components/RecipeEditor';
import Brewer from './components/Brewer';
import { useDebouncedCallback } from 'use-debounce';

const initialCoffeeAmount = 20;
const initialWaterAmount = 300;

const recipeKey = 'recipe';

const App = () => {
    const savedRecipe = localStorage.getItem(recipeKey);
    const initialRecipe = savedRecipe ? (JSON.parse(savedRecipe) as Recipe) : new Recipe(initialCoffeeAmount, initialWaterAmount);
    const [recipe, setRecipe] = useState(initialRecipe);

    const saveToLocalStorageDebounced = useDebouncedCallback((recipe: Recipe) => localStorage.setItem(recipeKey, JSON.stringify(recipe)), 500, {
        maxWait: 2000,
    });

    const handleRecipeChanged = (recipe: Recipe) => {
        setRecipe(recipe);
        saveToLocalStorageDebounced(recipe);
    };

    return (
        <Container maxWidth="sm">
            <Box>
                <RecipeEditor recipe={recipe} onRecipeChanged={handleRecipeChanged} />
                <Brewer recipe={recipe} />
            </Box>
        </Container>
    );
};

export default App;
