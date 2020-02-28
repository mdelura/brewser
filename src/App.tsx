import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import IconButton from '@material-ui/core/IconButton';

enum RecipeItem {
    Coffee = 'coffee',
    Water = 'water',
    Ratio = 'ratio'
}

const initialCoffeeAmount = 20;
const initialWaterAmount = 300;

class Recipe {
    [RecipeItem.Coffee]: number;
    [RecipeItem.Water]: number;
    [RecipeItem.Ratio]: number;

    constructor(coffee: number, water: number) {
        this.coffee = coffee;
        this.water = water;
        this.ratio = water / coffee;
    }
}

const App = () => {
    const [locks, setLocks] = useState({
        [RecipeItem.Coffee]: false,
        [RecipeItem.Water]: false,
        [RecipeItem.Ratio]: true
    });

    const [recipe, setRecipe] = useState(new Recipe(initialCoffeeAmount, initialWaterAmount));

    const calculate = {
        [RecipeItem.Coffee]: (recipe: Recipe) => recipe.water / recipe.ratio,
        [RecipeItem.Water]: (recipe: Recipe) => recipe.coffee * recipe.ratio,
        [RecipeItem.Ratio]: (recipe: Recipe) => recipe.water / recipe.coffee
    };

    const updateRecipe = (item: RecipeItem, value: number) => {
        const updatedRecipe = { ...recipe };
        for (const key in updatedRecipe) {
            const keyItem = key as RecipeItem;
            if (updatedRecipe.hasOwnProperty(key)) {
                if (key === item) {
                    updatedRecipe[keyItem] = value;
                } else if (!locks[keyItem]) {
                    updatedRecipe[keyItem] = calculate[keyItem](recipe);
                }
            }
        }

        setRecipe(updatedRecipe);
    };

    const lock = (item: RecipeItem) => {
        const locks = {
            [RecipeItem.Coffee]: false,
            [RecipeItem.Water]: false,
            [RecipeItem.Ratio]: false
        };
        locks[item] = true;
        setLocks(locks);
    };

    const locker = (item: RecipeItem) => (
        <IconButton disabled={locks[item]} onClick={() => lock(item)} color="primary">
            {locks[item] ? <LockIcon /> : <LockOpenIcon />}
        </IconButton>
    );
    return (
        <Container maxWidth="sm">
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Brewser!
                </Typography>
                {/* Coffee */}
                <Typography variant="button">Coffee</Typography>
                {locker(RecipeItem.Coffee)}
                <Typography>{recipe.coffee.toFixed(1)}g</Typography>
                <Slider
                    disabled={locks.coffee}
                    value={recipe.coffee}
                    min={1}
                    max={100}
                    onChange={(_, value) => updateRecipe(RecipeItem.Coffee, value as number)}
                    valueLabelDisplay="auto"
                    valueLabelFormat={value => value.toFixed()}
                />
                {/* Water */}
                <Typography variant="button">Water</Typography>
                {locker(RecipeItem.Water)}
                <Typography>{recipe.water.toFixed()}g</Typography>
                <Slider
                    value={recipe.water}
                    disabled={locks.water}
                    min={10}
                    max={1000}
                    step={10}
                    onChange={(_, value) => updateRecipe(RecipeItem.Water, value as number)}
                    valueLabelDisplay="auto"
                    valueLabelFormat={value => value.toFixed()}
                />
                {/* Ratio */}
                <Typography variant="button">Ratio</Typography>
                {locker(RecipeItem.Ratio)}
                <Typography>1:{recipe.ratio.toFixed(1)}</Typography>
                <Slider
                    value={recipe.ratio}
                    disabled={locks.ratio}
                    min={0}
                    max={100}
                    onChange={(_, value) => updateRecipe(RecipeItem.Ratio, value as number)}
                    valueLabelDisplay="auto"
                    valueLabelFormat={value => `1:${value.toFixed()}`}
                />
                <Typography>Allow to brew!</Typography>
                <Typography>4-6 recipe</Typography>
            </Box>
        </Container>
    );
};

export default App;
