// react
import { useState, ChangeEvent } from 'react';

// components
import ListCurrencies from './ListCurrencies';

// types
import { currency, propsConvertField } from './types';


// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default function({currencies, current, onChange}: propsConvertField) {
    const [showList, setShowList] = useState<boolean>(false);

    const formatAmount = (amount: string) => {
        const [num, float] = amount.split('.');
        const lastChar = amount.at(-1) == '.' ? '.' : "";

        if(!float || num.length >= 5) return num + lastChar;

        const maxFloat = 5 - num.length + (num == "0" ? 1 : 0);
        const regex = "^[0]*[0-9]{1,n}".replace("n", maxFloat.toString());
        const sliceFloat = float.match(regex);

        return `${num + lastChar}.${ sliceFloat }`;
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value: string = e.target.value;
        if(value.match(/^[0-9]*(\.){0,1}[0-9]{0,5}$/)) {
            onChange({...current, amount: value});
        }
    }

    return (
        <div className='w-full'>
            <div className='ConverterField flex grid-gap-5 relative'>
                <input
                    className="h-[50px] top-[204px] rounded-xl p-3 text-right px-5 w-full"
                    type="text"
                    placeholder='0.0'
                    value={ current.amount ? formatAmount(current.amount) : "" }
                    onChange={ e => handleChange(e) }
                />
                <div onClick={ () => setShowList(true) } className="ml-2 h-full absolute flex gap-2 items-center cursor-pointer">
                    <img src={current.img} alt={ current.symb } className="w-[4vh]"></img>
                    <span>{ current.symb }</span>
                    <span>
                        <svg
                            width="12" height="7" viewBox="0 0 12 7" fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M0.97168 1L6.20532 6L11.439 1" className="dark:stroke-white stroke-black"></path>
                        </svg>
                    </span>
                </div>
            </div>

            {
                showList ?
                <ListCurrencies
                    currencies={ currencies ?? [] }
                    onSelect={ (c: currency) => onChange({...c, amount: current.amount}) }
                    onClose={ () => setShowList(false) }
                /> :
                null
            }
        </div>
    );
}
