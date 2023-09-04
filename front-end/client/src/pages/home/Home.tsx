import useTheme from 'hooks/useTheme';
import { Language } from 'store/slices/appSlice';
import { Theme } from 'store/slices/appSlice';
import i18n from 'common/language/i18n';
import useLanguage from 'hooks/useLangauge';
import RecipeList from 'components/recipeList/RecipeList';

const Home = () => {
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
         <h1>All recipes</h1>
         <RecipeList />
      </div>
   );
};

export default Home;
