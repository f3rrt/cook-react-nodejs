import { useAuth } from 'hooks/useAuth';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from 'assets/logo.png';
import './Header.scss';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SearchModal from 'components/searchModal/SearchModal';

const Header = ({ theme }: { theme: string }) => {
   const { user } = useAuth();
   const [show, setShow] = useState(false);
   const navigate = useNavigate();
   const [searchQuery, setSearchQuery] = useState('');

   const handleInputChange = (e: any) => {
      const query = e.target.value;

      if (query) {
         setSearchQuery(query);
         setShow(true);
      }

      // Perform live search and update searchResults
   };

   return (
      <>
         {user && (
            <>
               <SearchModal show={show} setShow={setShow} value={searchQuery} />
            </>
         )}
         <Navbar expand="lg" data-bs-theme={theme}>
            <Container fluid>
               <Navbar.Brand onClick={() => navigate('/home')}>
                  <img
                     src={Logo}
                     width="30"
                     height="30"
                     className="d-inline-block align-top"
                     alt=""
                  />
               </Navbar.Brand>
               <Navbar.Toggle />
               <Navbar.Collapse>
                  <Nav className="me-auto my-2 my-lg-0">
                     {user && (
                        <>
                           <Nav.Link onClick={() => navigate('/profile')}>Profile</Nav.Link>
                           <Nav.Link onClick={() => navigate('/recipes')}>All Recipes</Nav.Link>
                           <Nav.Link onClick={() => navigate('/add-recipe')}>Add Recipe</Nav.Link>
                        </>
                     )}
                     {!user && (
                        <>
                           <Nav.Link onClick={() => navigate('/home')}>Home</Nav.Link>
                        </>
                     )}
                     {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
               </NavDropdown>
               <Nav.Link href="#" disabled>
                  Link
               </Nav.Link> */}
                  </Nav>
                  {!user ? (
                     <Nav>
                        <Nav.Link onClick={() => navigate('/log-in')}>Log In</Nav.Link>
                        <Nav.Link onClick={() => navigate('/registration')}>Registration</Nav.Link>
                     </Nav>
                  ) : (
                     <Nav>
                        <Form className="d-flex">
                           <Form.Control
                              type="search"
                              placeholder="Search"
                              className="me-2"
                              aria-label="Search"
                              onChange={handleInputChange}
                           />
                           <Button variant="morden">Search</Button>
                        </Form>
                        <div style={{ width: '20px' }}></div>
                        <Navbar.Text>
                           Signed in as: <a href="#login">{user.name}</a>
                        </Navbar.Text>
                        <div style={{ width: '20px' }}></div>
                        <Nav.Link onClick={() => navigate('/log-out')}>Log out</Nav.Link>
                     </Nav>
                  )}
               </Navbar.Collapse>
            </Container>
         </Navbar>
      </>
   );
};

export default Header;
