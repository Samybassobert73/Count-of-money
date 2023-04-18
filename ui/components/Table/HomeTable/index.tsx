import React, { useState, useEffect } from 'react';
import CryptoTableElement from '../CryptoTableElements';
import CryptoServices from '../../../_services/crypto'
import { CryptoTableHeader } from './HomeTableHeader';

//@ts-ignore
const CryptoTable = () => {
    const cryptoService = new CryptoServices();
    const [cryptoList, setCryptolist] = useState([])

    useEffect(() => {
        getHomeCrypto()
    }, [])

    const getHomeCrypto = async () => {
        await cryptoService.getHomeCryptos().then((response) => {
            setCryptolist(response.data['hydra:member'])
        })
    }


    return (
        <div className='relative w-full mt-10'>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            {/* <p className='z-10 text-headingTwo font-medium absolute text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>Veuillez vous <Link href='/login' className="text-main-purple font-semi-bold" >connectez</Link> afin d'accéder à la liste...</p> */}
            <div className="z-0 ">
                <table className="min-w-full  rounded-xl shadow-default">
                    <thead className="border-b bg-gray-100">
                        <tr className='grid items-center grid-cols-6'>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                NO
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                NAME
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                LAST PRICE
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                VOLUME
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                CHANGE
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                MARKET STATS
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            //@ts-ignore
                            cryptoList?.map((item, i) => <CryptoTableElement key={i} quote={item.baseAsset} index={++i} id={item.id} isHome={true} />)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CryptoTable
