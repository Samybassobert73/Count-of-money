import type {NextPage} from 'next';
import Layout from '../../components/Layout/Layout';
import Table from '../../components/Admin/RSSTable';

import {useState} from 'react';
import ModalUser from '../../components/Admin/ModalWithProps';
import AddRSS from '../../components/Admin/FormRSSAdd';
import FluxServices from '../../_services/flux';

const fluxServices = new FluxServices();
const Press: NextPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [events, setEvents] = useState<boolean>(false);

  return (
    <Layout title='Rss Feed'>
      <div className='flex justify-end mr-3'>
        <button
          type='button'
          onClick={() => {
            setOpen(!open);
            setEvents(!events);
          }}
          className='bg-btn hover:bg-btn-over shadow-default hover:shadow-default m-4 w-fit text-white font-medium p-btn-sm rounded-btn'
        >
          Add a rss feed
        </button>
        <ModalUser
          title='Add an rss feed'
          children={<AddRSS/>}
          open={open}
          setOpen={setOpen}
          setEvents={setEvents}
        />
      </div>
      {!events ? <Table events={events}/> : null}
    </Layout>
  );
};

export async function getStaticProps() {
  return {
    props: {
      protected: true,
      userTypes: ['admin'],
    },
  };
}

export default Press;
