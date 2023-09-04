import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import wrapperStyles from 'components/wrapper/Wrapper.module.scss';

interface WrapperProps {
   children: React.ReactNode | React.ReactNode[];
}

const Wrapper = ({ children }: WrapperProps) => {
   return (
      <>
         <Header /> <div className={wrapperStyles.page}>{children}</div> <Footer />
      </>
   );
};

export default Wrapper;
