import './Footer.module.scss' 


const RecipeItem = () => {
  const year = new Date().getFullYear();

  return <footer>{`Copyright © Upbeat Code ${year}`}</footer>;
 };
 
 export default RecipeItem;