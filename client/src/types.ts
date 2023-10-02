export interface IUser {
   name: string;
   email: string;
   role: string;
   // _id: string;
   // createdAt: Date;
   // updatedAt: Date;
}

export interface Ingredient {
   _id: string;
   quantity: number;
   unit: string;
}

export interface IngredientForm {
   _id: string;
   title: string;
   quantity: number;
   unit: string;
}

export interface IGenericResponse {
   status: string;
   message: string;
}

export interface Recipe {
   _id: string;
   title: string;
   description: string;
   instructions: string;
   imageUrl: string;
   ingredients: Ingredient[];
}

export interface RecipeForm {
   title: string;
   description?: string;
   instructions: string;
}
