import React, {useEffect, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import CryptoGraph from '../cryptoGraph'
import BinanceServices from '../../_services/binance';
import {faArrowTrendUp} from '@fortawesome/free-solid-svg-icons';
import {getPriceChangePercent, getPriceWithSpace} from '../../utils/crypto.utils';
import {faArrowTrendDown} from '@fortawesome/free-solid-svg-icons';

// @ts-ignore
const CryptoCard = ({currentPair, currentMoney, currentPrimary, isHome}) => {
  const Binance = new BinanceServices();
  const [currentPrice, setcurrentPrice] = useState(0)
  const [pourcentage, setpourcentage] = useState(null)

  useEffect(() => {
    getCryptoData();
  }, [])

  const getCryptoData = () => {
    Binance.getInfo(currentPair).then((res) => {
      var price = res.data.lastPrice;
      //@ts-ignore
      setcurrentPrice(parseFloat(price).toFixed(2))
      //@ts-ignore
      setpourcentage(getPriceChangePercent(res.data.lastPrice, res.data.openPrice))
    })
  }

  return (
    <div className='h-40 p-4 border border-gray-200 rounded-xl shadow-default '>
      {isHome ?
        <div>
          <div className='flex border-b border-gray-200 items-center'>
            <img src={'https://cryptoicons.org/api/icon/' + currentPrimary.toLowerCase() + '/50'} alt=''
                 className='rounded-full'/>
            <span className='text-cryptoName font-medium m-2'>{currentPrimary}</span>
            <span className='text-cryptoChain rounded-full  px-3 py-1 m-2'>{currentMoney}</span>
            <span className='text-cryptoIcon ml-auto text-gray-300'>
            {pourcentage != null ? <FontAwesomeIcon icon={pourcentage < 0 ? faArrowTrendDown : faArrowTrendUp}/> : null}
          </span>
          </div>
          <div className='flex items-center h-2/5'>
            <div className=''>
              <div className='ext-cryptoPrice font-bold'>${getPriceWithSpace(currentPrice)}</div>
              <div className='text-cryptoPourcentage text-gray-400'>{pourcentage}%</div>
            </div>
            <div className='w-8/12'>
              {pourcentage != null ?
                <CryptoGraph value={pourcentage} pair={currentPair} height={100} time={24} width={200}/> : null}
            </div>
          </div>
        </div> :
        <div className='relative'>
          <div className='flex items-center'>
            <img src={'https://cryptoicons.org/api/icon/' + currentPrimary.toLowerCase() + '/50'} alt=''
                 className='rounded-full'/>
            <span className='text-cryptoName font-regular m-2 font-poppins'>{currentPrimary} (24h)</span>
            <div className='text-cryptoPourcentage text-gray-400'>{pourcentage}%</div>
            <span className='text-cryptoIcon ml-auto text-gray-300'>
                {pourcentage != null ?
                  <FontAwesomeIcon icon={pourcentage < 0 ? faArrowTrendDown : faArrowTrendUp}/> : null}
              </span>
          </div>

          <div className='relative z-10'>
            <div className='text-cryptoPrice font-bold'>${getPriceWithSpace(currentPrice)}</div>
          </div>

          <div className='absolute top-12 z-0'>
            {pourcentage != null ?
                isHome
                  ? <CryptoGraph value={pourcentage} pair={currentPair} height={100} time={5} width={200}/>
                  // @ts-ignore
                  : <CryptoGraph value={pourcentage} pair={currentPair} height={100} time={5} width={null}/> : null}
          </div>
        </div>
      }
    </div>
  )
}

export default CryptoCard
