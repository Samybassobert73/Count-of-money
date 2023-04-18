import React from 'react';
import CryptoServices from '../../_services/crypto';
import BinanceServices from '../../_services/binance';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import Searchbar from '../Searchbar';

const cryptoServices = new CryptoServices();
const Binance = new BinanceServices();
export default class CryptoTable extends React.Component {
  state = {
    cryptos: [],
    checkIfAllCryptos: 0,
    events: false,
  };

  getCryptos() {
    cryptoServices
      .getAllCryptos()
      .then((res: { data: { [x: string]: any } }) => {
        let cryptos = res.data['hydra:member'];

        cryptos.map((element: any) =>
          Binance.getInfo(
            element['symbol']).then((res: any) => Object.assign(element, res.data))
        );
        this.setState({cryptos});

        let isHome = res.data['hydra:member'].map(function (crypto: {
          [x: string]: any;
        }) {
          return crypto['isHome'];
        });
        isHome = isHome.filter((v: boolean) => v === true).length;
        this.setState({checkIfAllCryptos: isHome});
      });
  }

  displayOnOff(id: string, form: {}, isTrue: boolean) {
    if (this.state.checkIfAllCryptos < 4 || isTrue === true) {
      cryptoServices.updateCryptoById(id, form).then();
      this.setState({events: true});
    }
  }

  componentDidMount() {
    this.getCryptos();
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (prevState.events !== this.state.events) {
      return this.getCryptos();
    }
  }

  colonnes = ['display', 'Name', 'price', 'change'];

  render() {
    return (
      <div className='min-h-screen subpixel-antialiased p-8'>
        <div className='flex justify-between pb-4'>
          <h1 className='text-headingTwo font-semiBold font-raleway'>Cryptos to display on the homepage</h1>
        </div>
        <div className='searchBar pb-4'>
          <Searchbar />
        </div>
        <div className='text-sm'>
          <div className='space-y-2'>
            <div className='bg-white shadow-lg hover:shadow-xl rounded-md overflow-hidden justify-center'>
              <table className='table flex table-auto w-full leading-normal'>
                <thead className='uppercase align-middle text-gray-600 text-xs font-semibold bg-gray-border'>
                <tr className='hidden md:table-row'>
                  {this.colonnes.map((element, i) => (
                    <th key={i} className='text-left p-3'>
                      <p>{element}</p>
                    </th>
                  ))}
                </tr>
                </thead>
                <tbody className='flex-1 text-gray-700 sm:flex-none'>
                {this.state.cryptos.map((crypto, i) => (
                  <tr
                    key={i}
                    className='border-t justify-items-center first:border-t-0 flex p-1 md:p-3 hover:bg-gray-100 md:table-row flex-col w-full flex-wrap'
                  >
                    <td className='p-1 md:p-3'>
                      <label
                        className='text-xs text-gray-500 uppercase font-semibold md:hidden'
                        htmlFor=''
                      >
                        display
                      </label>
                      <div className='flex justify-center'>
                        <button
                          onClick={() =>
                            this.displayOnOff(
                              crypto['id'],
                              {
                                isHome: !crypto['isHome'],
                              },
                              crypto['isHome']
                            )
                          }
                        >
                          {crypto['isHome'] === true ? (
                            <FontAwesomeIcon
                              className='cursor-pointer'
                              icon={faStar}
                              color='black'
                              style={{fontSize: 20}}
                            />
                          ) : (
                            <FontAwesomeIcon
                              className='cursor-pointer'
                              icon={faStar}
                              color='#d6d4d4'
                              style={{fontSize: 20}}
                            />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className='p-1 md:p-3'>
                      <label
                        className='text-xs text-gray-500 uppercase font-semibold md:hidden'
                        htmlFor=''
                      >
                        name
                      </label>
                      <div className='justify-between'>
                        {/*@ts-ignore*/}
                        <img src={`https://cryptoicons.org/api/icon/${crypto['baseAsset'].toLowerCase()}/20`}
                             alt=''
                             className='rounded-full'
                        />
                        <p className=''>{crypto['baseAsset']}</p>
                      </div>
                    </td>
                    <td className='p-1 md:p-3'>
                      <label
                        className='text-xs text-gray-500 uppercase font-semibold md:hidden'
                        htmlFor=''
                      >
                        price
                      </label>
                      <div>{crypto['lastPrice']}</div>
                    </td>
                    <td className='p-1 md:p-3'>
                      <label
                        className='text-xs text-gray-500 uppercase font-semibold md:hidden'
                        htmlFor=''
                      >
                        change
                      </label>
                      <div>{crypto['priceChange']}</div>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
