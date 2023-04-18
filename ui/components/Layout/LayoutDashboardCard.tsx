import React, {ReactNode} from 'react';
import Head from 'next/head';
import Sidebar from '../Sidebar';
import Searchbar from '../Searchbar';
import HeaderHome from '../Home/headerHome';

type Props = {
  children?: ReactNode;
  title?: string;
};

const LayoutDashboardCard = ({children, title = 'This is the default title'}: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8'/>
      <meta name='viewport'/>
    </Head>
    <header>
      <HeaderHome/>
      <div className='layout-dashboard flex'>
        <Sidebar/>
        <main className='min-h-screen flex flex-col p-4 mr-4 w-full'>
          {children}
        </main>
      </div>
    </header>
  </div>
);

export default LayoutDashboardCard;
