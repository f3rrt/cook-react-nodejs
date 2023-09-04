export type IRecipe = {
  id: number;
  title: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string;
  imageUrl?: any;
};

export type IMutateRecipe = {
  title: string;
  content: string;
};

export type IGenericResponse = {
  status: string;
  message: string;
};

export type IRecipeResponse = {
  status: string;
  note: IRecipe;
};

export type IRecipesResponse = {
  status: string;
  results: number;
  recipes: IRecipe[];
};

// export interface Recipe {
//   id: number;
//   title: string;
//   description: string;
//   ingredients: Ingredient[];
//   instructions: string;
//   imageUrl?: any;
// }

export interface Ingredient {
  id: number;
  title: string;
  quantity: number;
  unit: string;
}

export interface IngredientName {
  title: string;
  description: string;
}

//   export class Gallery {
//     // tslint:disable-next-line:variable-name
//     _id: string;
//     imageUrl: string;
//     imageTitle: string;
//     imageDesc: string;
//     uploaded: Date;
//   }
