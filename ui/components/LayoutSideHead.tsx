import React, {ReactNode} from 'react';
import Head from 'next/head';
import Sidebar from './Sidebar';
import HeaderHome from './Home/headerHome';

type Props = {
  children?: ReactNode;
  title?: string;
  content?: string;
};

const LayoutSideHead = ({
  children,
  title = 'This is the default title',
  content,
}: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8'/>
      <meta name='viewport' content={content}/>
    </Head>
    <header>
      <HeaderHome/>
      <div className='layout-dashboard-admin flex h-screen'>
        <Sidebar/>
        <main className=' w-full'>
          {children}
        </main>
      </div>
    </header>
  </div>
);

export default LayoutSideHead;
