import './RecipeList.module.scss' 


const RecipeList = () => {
  const year = new Date().getFullYear();

  return <footer>{`Copyright © Upbeat Code ${year}`}</footer>;
 };
 
 export default RecipeList;