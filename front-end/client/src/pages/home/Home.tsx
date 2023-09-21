//import Col from 'react-bootstrap/Col';
//import 'pages/home/Home.module.scss';
import { Row } from 'react-bootstrap';
import './Home.scss';
import RecipeList from 'components/recipeList/RecipeList';
//import { useAuth } from 'hooks/useAuth';

const Home = () => {
   //const { user } = useAuth();

   return (
      <>
         <div className="next-section">
            <h2>Most Popular Recipes</h2>
            <Row xs={1} md={2} className="g-3 recipe-home-list">
               {<RecipeList limit={4} />}
            </Row>
            {/* <Row className="recipe-wrapper">
               <RecipeList limit={4} />
            </Row> */}
         </div>
      </>
   );
};

export default Home;
