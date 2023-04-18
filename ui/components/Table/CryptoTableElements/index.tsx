import { useEffect, useState } from "react";
import BinanceServices from "../../../_services/binance";
import { getPriceChangePercent, getPriceWithSpace } from "../../../utils/crypto.utils";
import CryptoGraph from "../.././cryptoGraph";
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Colors } from "../../../styles/colors";
import UserCryptoServices from "../../../_services/user_crypto";
import { useDispatch } from "react-redux";
import { refresh } from "../../../store/slices/EventSlices";


//@ts-ignore
const CryptoTableElement = ({ quote, index, id, isFav, idUser, isHome }) => {
    const Binance = new BinanceServices();
    const UserCrypto = new UserCryptoServices();

    const [currentPrice, setcurrentPrice] = useState(0)
    const [pourcentage, setpourcentage] = useState(null)
    const [volume, setVolume] = useState(0)
    const [isFavState, setIsFavState] = useState(isFav)
    const [isLoaded, setIsLoaded] = useState(false)

    const dispatch = useDispatch();

    useEffect(() => {
        getCryptoData();
    }, [isHome])



    const getCryptoData = () => {
        Binance.getInfo(quote + "USDT").then((res) => {
            var price = res.data.lastPrice;
            //@ts-ignore
            setcurrentPrice(parseFloat(price).toFixed(3))
            //@ts-ignore
            setVolume(parseInt(res.data.volume))
            //@ts-ignore
            setpourcentage(getPriceChangePercent(res.data.lastPrice, res.data.openPrice))
        })
    }

    const addUserCrypto = () => {
        console.log("coco => " + idUser)
        if (!isLoaded) {
            setIsLoaded(true)
            if (isFavState) {
                UserCrypto.getUserCryptoByUserAndCrypto(idUser, id).then((res) => {
                    UserCrypto.removeUserCrypto(res.data["hydra:member"][0].id).then((res) => {
                        dispatch(refresh())
                        setIsFavState(false)
                        setIsLoaded(false)
                    })
                })
            } else {
                //@ts-ignore
                UserCrypto.addUserCrypto(idUser, id).then((res) => {
                    dispatch(refresh())
                    setIsFavState(true)
                    setIsLoaded(false)
                })
            }
        }
    }
    return (
        <tr className={'border-b grid items-center grid-cols-' + (isHome ? '6' : '7')}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index}</td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {//<img src={"https://cryptoicons.org/api/icon/" + quote.toLowerCase() + "/25"} alt=""
                  //    className='rounded-full'/>
                }                {quote}
            </td>
            <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                ${getPriceWithSpace(currentPrice)}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                ${getPriceWithSpace(volume)}
            </td>
            {pourcentage != null ? <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap" color={pourcentage < 0 ? Colors.RED : Colors.GREEN}>
                {pourcentage}%
            </td> : null}
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {pourcentage != null ? <CryptoGraph value={pourcentage} pair={quote + "USDT"} time={24} height={70} width={100} /> : null}
            </td>
            {!isHome ? <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <FontAwesomeIcon icon={faStar} color={isFavState ? Colors.YELLOW_STAR : Colors.GREY_STAR} onClick={() => addUserCrypto()} />
            </td> : null}
        </tr>
    )
}

export default CryptoTableElement;
