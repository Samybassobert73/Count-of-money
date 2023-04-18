import React, {useEffect, useState} from 'react';
import UserCryptoServices from '../../_services/user_crypto';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import CryptoCard from '../Home/cryptoCard';
import {reset} from '../../store/slices/EventSlices';
import Converter from '../Crypto/Converter';
import {currency} from '../Crypto/types';
import CoinGeckoApi from '../Crypto/CoinGeckoAPI';

type MyState = { show: boolean };

const FavoriteCryptoDashboard = () => {
  const userCryptoService = new UserCryptoServices();
  const [cryptoList, setCryptolist] = useState([])
  const dispatch = useDispatch();

  // @ts-ignore
  const {id} = useSelector((state: RootState) => state.user)
  const {toRefresh} = useSelector((state: RootState) => state.event)
  const [currencies, setCurrencies] = useState<currency[]>([]);
  const clientAPI = new CoinGeckoApi();

  useEffect(() => {
    getUserCrypto();
    clientAPI.get()
      .then(setCurrencies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const getUserCrypto = () => {
    userCryptoService.getUserCryptoById(id).then((response) => {
      // @ts-ignore
      const temp = []
      // @ts-ignore
      response.data['hydra:member'].forEach(element => {
        temp.push(element.crypto)
      })
      // @ts-ignore
      setCryptolist(temp)
    })
  }
  if (toRefresh) {
    getUserCrypto();
    dispatch(reset());
  }

  return (
    <div className='flex gap-4'>
      <div className='grid grid-cols-4 gap-4 w-full'>
        {
          // @ts-ignore
          cryptoList.map((crypto, key) => <CryptoCard currentPair={crypto.symbol} currentPrimary={crypto.baseAsset} currentMoney={crypto.quoteAsset} isHome={false} key={key}/>)
        }
      </div>
      <div>
        <Converter currencies={currencies}></Converter>
      </div>
    </div>
  );
}

export default FavoriteCryptoDashboard;
