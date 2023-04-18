import React, { ReactNode } from 'react';
import Head from 'next/head';
import Sidebar from '../Sidebar';
import Searchbar from '../Searchbar';
import HeaderHome from '../Home/headerHome';

type Props = {
  children?: ReactNode;
  title?: string;
  content?: string;
};

const Layout = ({
  children,
  title = 'This is the default title',
  content,
}: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content={content} />
    </Head>
    <header>
      <HeaderHome />
      <div className='layout-dashboard-admin flex'>
        <Sidebar />
        <main className='min-h-screen flex flex-col w-full'>
          {children}
        </main>
      </div>
    </header>
  </div>
);

export default Layout;
