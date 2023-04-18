import type {NextPage} from 'next';
import Layout from '../../components/Layout/Layout';
import Table from '../../components/Admin/CryptoTable';
import Searchbar from '../../components/Searchbar';

const Crypto: NextPage = () => {
  return (
    <Layout title='Crypto'>
      <Table/>
    </Layout>
  );
};

export async function getStaticProps() {
  return {
    props: {
      protected: true,
      userTypes: ['admin']
    },
  }
}

export default Crypto;
