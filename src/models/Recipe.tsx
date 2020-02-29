import { RecipeItem } from './RecipeItem';
export class Recipe {
    [RecipeItem.Coffee]: number;
    [RecipeItem.Water]: number;
    [RecipeItem.Ratio]: number;
    constructor(coffee: number, water: number) {
        this.coffee = coffee;
        this.water = water;
        this.ratio = water / coffee;
    }
}
