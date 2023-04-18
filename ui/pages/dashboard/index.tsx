import type {NextPage} from 'next';
import FavoriteCryptoDashboard from '../../components/Dashboard/FavoriteCryptoDashboard';
import React from 'react';
import LayoutDashboardCard from '../../components/Layout/LayoutDashboardCard';
import Converter from '../../components/Crypto/Converter'
import {currency} from '../../components/Crypto/types'
import CoinGeckoApi from '../../components/Crypto/CoinGeckoAPI'
import {useEffect, useState} from 'react'
import UserCryptoTable from '../../components/Table/DashboardTable';

const Index: NextPage = () => {
  const clientAPI = new CoinGeckoApi();
  const [currencies, setCurrencies] = useState<currency[]>([]);

  useEffect(() => {
    clientAPI.get()
      .then(setCurrencies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LayoutDashboardCard>
      <h2 className='font-medium text-headingTwo'>Favorites crypto&apos;s</h2>
      <div className='gap-4 mt-10'>
        <FavoriteCryptoDashboard/>
      </div>
      <UserCryptoTable/>
    </LayoutDashboardCard>
  );
};

export default Index;
