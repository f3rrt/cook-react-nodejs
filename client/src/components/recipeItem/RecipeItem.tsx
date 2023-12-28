import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './RecipeItem.scss'
import { useNavigate } from 'react-router-dom';


function RecipeItem({recipe}: any) {
  const navigate = useNavigate();

  const seeDetals = ()=> {
    navigate(`/recipe/${recipe._id}`);
  }

  return (
    <Card className='recipe-card' >
        /api/olo.jpg
      <Card.Img variant="top" src={process.env.BASE_SERVER_URL_PREFIX + recipe.imageUrl} />
      <Card.Body>
        <Card.Title>{recipe.title}</Card.Title>
        <Card.Text>
          {recipe.description}
        </Card.Text>
        <Button variant="morden" onClick={seeDetals}>See details</Button>
      </Card.Body>
    </Card>
  );
}

export default RecipeItem;