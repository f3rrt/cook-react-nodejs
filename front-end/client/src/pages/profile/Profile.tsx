import './Profile.scss';
import { useAppSelector } from 'redux/index';
import { Card } from 'react-bootstrap';

function Profile() {
   const user = useAppSelector((state) => {
      return state.auth.user;
   });
   // const navigate = useNavigate();

   return (
      <Card style={{ width: '58rem' }}>
         {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
         <Card.Body>
            <Card.Title>Hi, {user.name}</Card.Title>
            <Card.Text>Welcome to app, here you can:</Card.Text>
            <Card.Link href='/add-recipe'>Create Recipe</Card.Link>
            <Card.Link href='/recipes'>See all Recipes</Card.Link>
            <Card.Link href='/add-ingredient'>Add new Ingredients</Card.Link>
         </Card.Body>
      </Card>
   );
}

export default Profile;
