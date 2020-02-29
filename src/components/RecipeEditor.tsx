import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import IconButton from '@material-ui/core/IconButton';
import { Recipe } from '../models/Recipe';
import { RecipeItem } from '../models/RecipeItem';

export interface RecipeEditorProps {
    recipe: Recipe;
    onRecipeChanged: (recipe: Recipe) => void;
}

const RecipeEditor: React.SFC<RecipeEditorProps> = ({ recipe, onRecipeChanged }) => {
    const [locks, setLocks] = useState({
        [RecipeItem.Coffee]: false,
        [RecipeItem.Water]: false,
        [RecipeItem.Ratio]: true
    });

    const calculate = {
        [RecipeItem.Coffee]: () => recipe.water / recipe.ratio,
        [RecipeItem.Water]: () => recipe.coffee * recipe.ratio,
        [RecipeItem.Ratio]: () => recipe.water / recipe.coffee
    };

    const updateRecipe = (item: RecipeItem, value: number) => {
        const updatedRecipe = { ...recipe };
        for (const key in updatedRecipe) {
            const keyItem = key as RecipeItem;
            if (updatedRecipe.hasOwnProperty(key)) {
                if (key === item) {
                    updatedRecipe[keyItem] = value;
                } else if (!locks[keyItem]) {
                    updatedRecipe[keyItem] = calculate[keyItem]();
                }
            }
        }

        onRecipeChanged && onRecipeChanged(updatedRecipe);
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

    const lockerButton = (item: RecipeItem) => (
        <IconButton disabled={locks[item]} onClick={() => lock(item)} color="primary">
            {locks[item] ? <LockIcon /> : <LockOpenIcon />}
        </IconButton>
    );
    return (
        <React.Fragment>
            {/* Coffee */}
            <Typography variant="button">Coffee</Typography>
            {lockerButton(RecipeItem.Coffee)}
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
            {lockerButton(RecipeItem.Water)}
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
            {lockerButton(RecipeItem.Ratio)}
            <Typography>1:{recipe.ratio.toFixed(1)}</Typography>
            <Slider
                value={recipe.ratio}
                disabled={locks.ratio}
                min={1}
                max={100}
                onChange={(_, value) => updateRecipe(RecipeItem.Ratio, value as number)}
                valueLabelDisplay="auto"
                valueLabelFormat={value => `1:${value.toFixed()}`}
            />
        </React.Fragment>
    );
};

export default RecipeEditor;
