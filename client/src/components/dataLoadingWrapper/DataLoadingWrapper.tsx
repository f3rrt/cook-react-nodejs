import NoAccessComponent from 'components/noAccessComponent/NoAccessComponent';
import PageLoading from 'components/pageLoading/PageLoading';
import { Alert, Button } from 'react-bootstrap';

interface DataLoadingWrapperProps {
   isLoading: boolean;
   error: any;
   isSuccess?: boolean;
   children: React.ReactNode;
}

const DataLoadingWrapper = ({ isLoading, error, isSuccess, children }: DataLoadingWrapperProps) => {
   if (error) {
      console.error(error);
   }
   const refreshPage = () => {
      window.location.reload();
   };
   return (
      <>
         {isLoading && <PageLoading />}
         {isSuccess && <Alert variant="success">Operation Successfully Completed</Alert>}
         {!isLoading && error && error.status === 401 && <NoAccessComponent />}
         {!isLoading && error && error.status !== 401 && (
            <Alert variant="danger">
               {typeof error === 'string' ? error : error?.error}
               {error.data ? error.data.message : error?.error}

               <br />
               <Button onClick={refreshPage} variant="link">
                  Go Back
               </Button>
            </Alert>
         )}
         {!isLoading && !error && children}
      </>
   );
};

export default DataLoadingWrapper;
