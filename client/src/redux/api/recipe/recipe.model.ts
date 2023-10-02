/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Recipe {
    id: number;
    title: string;
    description: string;
    ingredients: Ingredient[];
    instructions: string;
    imageUrl?: any;
 }
 export interface Ingredient {
    id: number;
    title: string;
    quantity: number;
    unit: string;
 }
 export interface GetAllRecipesResponse {
    recipes: Recipe[];
 }
 
 export interface RecipeService {
    getAllRecipes: () => HttpPromise<GetAllRecipesResponse>;
 }
 