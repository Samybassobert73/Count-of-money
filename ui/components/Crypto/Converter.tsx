import {useEffect, useState} from 'react';
import ConverterField from './ConverterField';
import {currency, propsConverter, selectedCurrency} from './types';

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default function ({currencies}: propsConverter) {
  const [from, setFrom] = useState<selectedCurrency>({
    ...(currencies.find((c) => c.symb == 'BTC') ?? ({
      id: 'bitcoin',
      symb: 'BTC',
      name: 'Bitcoin',
      img: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
    } as currency)),
    amount: '',
  });
  const [to, setTo] = useState<selectedCurrency>({
    ...(currencies.find((c) => c.symb == 'USDC') ?? ({
      id: 'ethereum',
      symb: 'ETH',
      name: 'Ethereum',
      img: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880',
    } as currency)),
    amount: '',
  });

  useEffect(() => {
    const fromPrice =
      from.price ?? currencies.find((c) => c.symb == from.symb)?.price ?? 0;
    const fromAmount = parseFloat(from.amount) ?? 0;
    const toPrice =
      to.price ?? currencies.find((c) => c.symb == to.symb)?.price ?? 0;
    const amount = fromAmount * (fromPrice / toPrice) || '';

    setTo((prev: selectedCurrency) => ({...prev, amount: amount.toString()}));
  }, [from, to.amount, to.price]);

  return (
    // <div className="ml-auto pb-5 w-[340px] top-[82px] rounded-xl border border-gray shadow-[0px_0px_20px_rgba(0,0,0,0.1)] bg-gray-modal dark:bg-gray-700">
    <div className="p-4 w-[340px] border border-gray-200 rounded-xl shadow-default ">
      <div>
        <p className="text-[#312A64] text-titleComparator font-semiBold font-poppins">
          Exchange
        </p>
      </div>
      <div className=' flex flex-col items-center'>
        <label htmlFor="from" className="self-start font-poppins font-regular text-label my-3">
          FROM
        </label>
        <ConverterField
          currencies={currencies}
          current={from}
          onChange={(c: selectedCurrency) => setFrom(c)}
        />
      </div>
      <div className='mb-auto flex flex-col items-center'>
        <label htmlFor="to" className="self-start font-poppins font-regular text-label my-3">
          TO
        </label>
        <ConverterField
          currencies={currencies}
          current={to}
          onChange={(c: selectedCurrency) => setTo(c)}
        />
      </div>
    </div>
  );
}
