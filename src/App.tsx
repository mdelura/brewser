import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { Recipe } from './models/Recipe';
import RecipeEditor from './components/RecipeEditor';
import Brewer from './components/Brewer';
import Typography from '@material-ui/core/Typography';

const initialCoffeeAmount = 20;
const initialWaterAmount = 300;

const App = () => {
    const [recipe, setRecipe] = useState(new Recipe(initialCoffeeAmount, initialWaterAmount));

    return (
        <Container maxWidth="sm">
            <Box>
                <Typography variant="h4">Brewser</Typography>
                <RecipeEditor recipe={recipe} onRecipeChanged={setRecipe} />
                <Brewer recipe={recipe} />
            </Box>
        </Container>
    );
};

export default App;
