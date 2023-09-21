import RecipeList from 'components/recipeList/RecipeList';
import Row from 'react-bootstrap/Row';

//import 'pages/home/Home.module.scss';
import './Recipe.scss';

const Recipes = () => {
   // const { theme, setCurrentTheme } = useTheme();
   // const { language, setCurrentLanguage } = useLanguage();

   // const setLanguageToRu = () => {
   //    setCurrentLanguage(Language.RU);
   // };
   // const setDarkTheme = () => {
   //    setCurrentTheme(Theme.Dark);
   // };

   return (
      <div>
         <Row>
            <header>
               <h1>All recipes</h1>
            </header>
         </Row>
         <Row xs={1} md={2} className="g-3 recipe-home-list">
            <RecipeList />
         </Row>
      </div>
   );
};

export default Recipes;
