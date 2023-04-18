import type { NextPage } from 'next'
import HeaderHome from '../components/Home/headerHome'
import FooterHome from '../components/Home/footerHome'
import CryptoCard from '../components/Home/cryptoCard'
import CryptoTable from '../components/Table/HomeTable'
import CryptoNews from '../components/Home/cryptoNews'
import CryptoNewsSqueleton from '../components/Home/cryptoNewsSqueleton'
import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import CryptoService from '../_services/crypto';
import { getFeed } from '../utils/rss.utils'
import { useSession } from 'next-auth/react'
import FluxServices from '../_services/flux'

const Home: NextPage = () => {




  const [feeds, setFeeds] = useState([]);
  const [rssImage, setRssImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const cryptoService = new CryptoService();
  const [cryptolist, setCryptolist] = useState([])
  const getHomeCrypto = async () => {
    await cryptoService.getHomeCryptos().then((response) => {
      setCryptolist(response.data["hydra:member"])
    })
  }
  const { data: session } = useSession()
  useEffect(() => {

    setIsLoading(true);
    const articleSource = {
      url: ""
    }
    const flux = new FluxServices();
    flux.getAllFlux().then(fluxs => {

      fluxs.data["hydra:member"]?.forEach((flux: any) => {
        if (flux.isHome === true) {
          let item = getFeed(flux.url);
          item.then(function (result) {

            if (result != undefined) {
              const arr = result.items;
              const filterarr: any = arr.slice(0, 8);
              setFeeds(filterarr);
              if (typeof result.image !== 'undefined') {
                setRssImage(result.image.url);
              }
              setIsLoading(false);
            }
          })
        }
      });
    })

    getHomeCrypto()
  }, [])


  return (
    <div className='w-full'>
      <HeaderHome />
      <div className='bg-[url("/img/background/bg-features.png")] bg-cover bg-no-repeat bg-center h-full w-full'>
        <div className='mx-auto container '>
          {/* block1 */}
          <div className='relative flex flex-col py-20 justify-center items-center text-center '>
            <div
              className='absolute z-0 top-0 bg-[url("/img/background/bg-header.png")] bg-contain bg-no-repeat bg-center h-[130%] w-full'></div>
            <div className='z-10'>
              <h1 className='font-raleway text-headingOne font-bold '>Today&apos;s Cryptocurrency <br />
                <span>Prices by
                  <span
                    className='font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-purple-500'> BINANCE</span>
                </span>
              </h1>
              <p className='text-subTitle my-12'>Only at the count of money, you can build a good portfolio and
                learn <br></br>best practices about cryptocurrency
              </p>
              {/* <a className='my-12 bg w-fit hover:bg-violet-700 text-white font-bold p-btn-lg rounded'>Get Started</a> */}
              <Link href='/register' className='btn '>Get Started</Link>
            </div>
          </div>
          {/* block2 */}
          <div className='mt-10'>
            <h2 className='font-medium text-headingTwo'>Market Trend</h2>
            <div className='flex flex-col gap-4 sm:flex-row my-8'>
              { //@ts-ignore
                cryptolist?.slice(0, 4).map((crypto, index) => <CryptoCard key={index} currentPair={crypto.symbol} currentMoney={crypto.quoteAsset} currentPrimary={crypto.baseAsset} isHome={true} />)}
              {/* <CryptoCard currentPair={"BTCUSDT"} currentMoney={"USDT"} currentPrimary={"BTC"} />
                            <CryptoCard currentPair={"ETHUSDT"} currentMoney={"USDT"} currentPrimary={"ETH"} />
                            <CryptoCard currentPair={"ADAUSDT"} currentMoney={"USDT"} currentPrimary={"ADA"} />
                            <CryptoCard currentPair={"BNBUSDT"} currentMoney={"USDT"} currentPrimary={"BNB"} /> */}

            </div>
          </div>
          <div className='mt-20'>
            <div className='z-10'>
              <h2 className='font-medium text-headingTwo '>List of cryptocurrency</h2>
              <div className='my-8 '>
                <CryptoTable />
              </div>
            </div>
          </div>
          <div className='mt-10'>
            <h2 className='text-headingTwo font-medium '>Learn about cryptocurrency</h2>
            <div className=' mt-4 grid grid-cols-1 sm:grid-cols-4 gap-x-10 gap-y-20 '>

              {feeds.map((feed, index) => (
                isLoading ?
                  <CryptoNewsSqueleton key={index}/>
                  :
                  <CryptoNews key={index} rssFeed={feed} rssImage={rssImage} />
              ))}
            </div>
          </div>
          {/* footer */}
        </div>
      </div>
      <FooterHome />
    </div>
  )
}

export default Home


