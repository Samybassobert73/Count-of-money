
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CryptoGraph from './cryptoGraph'
import BinanceServices from '../_services/binance';
import { getPriceChangePercent } from '../utils/crypto.utils';




const CryptoCard = ({currentPair, currentMoney, currentPrimary}: {currentPair : string, currentMoney: string, currentPrimary: string}) => {
  const Binance = new BinanceServices();
  const [currentPrice, setcurrentPrice] = useState("")
  const [pourcentage, setpourcentage] = useState(0)

  useEffect(() => {
    getCryptoData();
  }, [])
  


  const getCryptoData = () => {
    
    Binance.getInfo(currentPair).then((res) => {
      var price = res.data.lastPrice; 
      
      setcurrentPrice(parseFloat(price).toFixed(2))
      
      setpourcentage(parseInt(getPriceChangePercent(res.data.lastPrice, res.data.openPrice)))
    })
  }
  
    return (
      <div className='w-1/5 mx-2  p-6 bg-white border border-gray-200 rounded-xl shadow-md dark:bg-gray-800 dark:border-gray-70'>
        <div className='flex py-4 border-b border-gray-200 items-center'>
        <img src={"https://cryptoicons.org/api/icon/"+ currentPrimary.toLowerCase() +"/50"} alt=""  className='rounded-full'/>
            <span className='text-sm font-medium m-2'>{currentPrimary}</span>
            <span className='text-xs rounded-full bg-gray-200 px-3 py-1 m-2'>{currentMoney}</span>
            <span className='ml-auto text-gray-300'><FontAwesomeIcon icon={['fas', 'arrow-trend-up']}/></span>
        </div>
        <div className='flex items-center'>
            <div className='p-4'>
                <div className='font-bold'>${currentPrice}</div>
                <div className='text-gray-400'>{pourcentage}%</div>
            </div>
            <div className='ml-auto'>
                <CryptoGraph value={pourcentage} pair={currentPair} width={130} height={80} time={24}/>
            </div>
        </div>
            
      </div>
    )
  }
  
  export default CryptoCard