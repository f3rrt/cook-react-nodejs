import pageStyles from 'components/page/Page.module.scss';
import React from 'react';

interface PageProps {
   children: React.ReactNode | React.ReactNode[];
}

const Wrapper = ({ children }: PageProps) => {
   return <div className={pageStyles.page}>{children}</div>;
};

export default Wrapper;