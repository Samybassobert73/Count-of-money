import React, { useState, useEffect } from 'react'
import CryptoTableElement from '../CryptoTableElements'
import CryptoServices from '../../../_services/crypto'
import UserCryptoServices from '../../../_services/user_crypto'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import Searchbar from '../../Searchbar';


//@ts-ignore
const UserCryptoTable = () => {
    const cryptoService = new CryptoServices();
    const userCryptoService = new UserCryptoServices();
    const [cryptoList, setCryptolist] = useState([])
    const [allCrypto, setAllCrypto] = useState([])

    // @ts-ignore
    const { id } = useSelector((state: RootState) => state.user)

    useEffect(() => {
        getUserCrypto()
    }, [])


    const getUserCrypto = async () => {

        await userCryptoService.getUserCryptoById(id).then((response) => {
            // @ts-ignore
            const temp = []
            // @ts-ignore
            response.data['hydra:member'].forEach(i => {
                temp.push(i.crypto)

            })
            // @ts-ignore
            setCryptolist(temp)
            getAllCrypto()
        })
    }

    const getAllCrypto = async () => {
        await cryptoService.getAllCryptos().then((response) => {
            setAllCrypto(response.data['hydra:member'])
        })
    }

    // @ts-ignore
    const checkIfUserCrypto = (crypto) => {
        // @ts-ignore
        return cryptoList.some((i) => i.id == crypto.id)
    }

    return (
        <div className='relative w-full mt-10'>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            {/* <p className='z-10 text-headingTwo font-medium absolute text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>Veuillez vous <Link href='/login' className="text-main-purple font-semi-bold" >connectez</Link> afin d'accéder à la liste...</p> */}
            <div className="z-0 ">
                <div className='searchBar pb-4'>
                    <Searchbar />
                </div>
                <table className="min-w-full  rounded-xl shadow-default">
                    <thead className="border-b bg-gray-100">
                        <tr className='grid items-center grid-cols-7'>
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
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                FAVORITE
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            //@ts-ignore
                            allCrypto.map((item, i) => <CryptoTableElement key={i} quote={item.baseAsset} index={++i} id={item.id} isFav={checkIfUserCrypto(item)} idUser={id} isHome={false} />)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserCryptoTable
