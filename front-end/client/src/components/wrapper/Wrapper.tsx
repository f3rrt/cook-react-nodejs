import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import { Button, Container } from 'react-bootstrap';

import './Wrapper.scss';
import { useAuth } from 'hooks/useAuth';
interface WrapperProps {
   children: React.ReactNode | React.ReactNode[];
}

const Wrapper = ({ children }: WrapperProps) => {
   const { user } = useAuth();
   console.log(window.location.pathname);
   return (
      <>
         {window.location.pathname === '/home' ? (
            <>
               <div className="home-container">
                  <Header theme='dark'/>
                  <h1>Recipe Book</h1>
                  <h4>Your Culinary Adventure Begins Here</h4>
                  {!user && (
                     <div className="user-btns">
                        <Button href="log-in" variant="morden">
                           Log In
                        </Button>
                        <Button href="registration" className='regist-btn' variant="">
                           Regisration
                        </Button>
                     </div>
                  )}
               </div>
               <Container className="wrap">{children}</Container>
               <Footer />
            </>
         ) : (
            <>
               <Header theme=''/>
               <Container className="wrap">{children}</Container>
               <Footer />
            </>
         )}
      </>
   );
};

export default Wrapper;
